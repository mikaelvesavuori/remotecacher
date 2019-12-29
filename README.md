# RemoteCacher

RemoteCacher makes it simple to store remote data in your browser's native localStorage. While this is relatively simple to setup for a project, this can easily turn into the kind of boilerplate churn that no developer likes.

With RemoteCacher, you get a simple interface allowing you to return cached data or evict it. By infering what data is available, looking at the cache key's time-to-live and what params you pass, you don't have to deal with the drudgery of doing `if/else` kind of code to determine if you need to grab new fresh data or return it, and so on.

## Setup

1. Import the script as per the `Loading the script` section in this document.
2. It's nicer to create a dedicated cache configuration object that you can reuse in case you need to run more frequent cache checks. For the format, see below.
3. Call `RemoteCacher.cache(cacheConfig)` where `cacheConfig` is your cache configuration object. Also make sure to `await` your response since the function returns a promise.
4. The remote data will now be cached in localStorage together with a timestamp under the given `cacheKey`. Whenever you run `RemoteCacher.cache(cacheKey)` (where `cacheKey` is an already cached key) you will get back the in-memory data instead of fetching it online again.
5. **Note**: It's going to be more resilient to run a full `RemoteCacher.cache(cacheConfig)` as the additional parameters will ensure that there is enough context for the function to actually get new data when the cache is expired. _An expired cache, without the additional params, will result in an error being thrown._ While this will happen (with default TTL) only once the cache has lived more than one hour, and may not affect you, it should be made clear from my end regardless. _Beyond this resiliency factor, the functionality and caching is exactly the same._

**Example**

```
// Set up a configuration for your cache
// NB: You can use multiple configs/keys
const cacheConfig = {
	cacheKey: 'features',
	source: 'https://someurl.com/api/',
	body: {
		market: 'JP'
	},
	headers: {
		method: 'POST'
		Authorization: 'Bearer {abc123...}'
	},
	cacheTtl: 300
};

// NB: The function returns a promise, so it should be awaited
const cachedData = await RemoteCacher.cache(cacheConfig);

console.log(cachedData);
```

## Configuration

`RemoteCacher`'s primary function is named **cache()** which takes a configuration object.

```
RemoteCacher.cache({
  cacheKey, // The key name (string) you want to use with localStorage; required
  source, // An endpoint URL (string) to call with Fetch(); required when fetching new data (happens if cacheKey is empty or stale)

	/* Other keys, and their defaults */
  body = null, // Body to pass to Fetch(). Default is to not use any body.
  headers = { method: 'GET' }, // Headers block to pass to Fetch(). Default is to GET data.
  cacheTtl = 3600 // Cache time-to-live, specified in seconds. Default is 1 hour.
});
```

### Evicting the cache

The secondary function of `RemoteCacher` is **evict()**.

This can be done per key with `RemoteCacher.evict(cacheKey)` provided a given key, or with `RemoteCacher.evict()` to clear the entirety of localStorage.

## Loading the script

### Browser

Load the script from [unpkg](https://unpkg.com) with:

```
<script src="https://unpkg.com/remotecacher@1.0.4/dist/remotecacher.js"></script>
```

Or just use it old-school, by downloading the script and referencing it locally if you prefer.

### Frontend SPA (React etc.)

You should be able to import it just fine, presumably with something normal-looking like `import { cache, evict } from 'remotecacher'`. Do a pull request if there is something with the import that's flaky and needs work.

## Commands

### Development server

Run `yarn dev` or `npm run dev` to start a development server. It will mount the Javascript into `src/index.html` which is a very simple frame for validating or testing your functionality.

### Build for production

Run `yarn build` or `npm run build` and it will use Webpack to bundle a UMD build into the `dist` folder. Supported browsers can be seen below.

Note that the template/demo HTML page in `/src` will not be bundled when building.

## Compatibility and .browserslist settings

I've compiled the distribution code with the following `.browserslist` settings:

```
Chrome >= 77
Safari >= 12
iOS >= 11
Firefox >= 70
Edge >= 15
> 5%
not IE 11
```

At the time of doing version `1.0.0`, this had global coverage of **76.89%**.

## Tests

None right now.

## Possible future improvements

- Investigate if there is a need for "sticky" functionality on the `RemoteCacher` end, so for example A/B type values do not suddenly reset or change
