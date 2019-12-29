import { getCache } from './functions/getCache.mjs';
import { fetchData } from './functions/fetchData.mjs';
import { evictCache } from './functions/evictCache.mjs';

import {
  ERROR_MSG_MISSING_CACHEKEY_IN_CALL,
  ERROR_MSG_MISSING_SOURCE_IN_CALL
} from './functions/errorHandling.mjs';

/**
 * Cache ensures that your cache key in localStorage is fresh/valid
 * and that new data gets fetched if it has gone stale according to your
 * optional 'cacheTtl' value (default is 3600 seconds, i.e. 1 hour).
 *
 * @exports
 * @async
 * @function
 * @typedef cacheConfig - Cache configuration is an object with five fields, where only the first ('cacheKey' string) is mandatory.
 * @type {object}
 * @property {string} cacheKey - The key name you want to use with localStorage. Required.
 * @property {string} [source] - An endpoint URL to call with Fetch(). Required when fetching new data (happens if cacheKey is empty or stale).
 * @property {object} [body=null] - Body to pass to Fetch().
 * @property {object} [headers={ method: 'GET' }] - Headers block to pass to Fetch().
 * @property {number} [cacheTtl=3600] - Cache time-to-live, specified in seconds. Default is 1 hour.
 * @returns {promise}
 */
export async function cache({
  cacheKey,
  source,
  body = null,
  headers = {
    method: 'GET'
  },
  cacheTtl = 3600
}) {
  if (!cacheKey) {
    throw new Error(ERROR_MSG_MISSING_CACHEKEY_IN_CALL);
  }

  let cachedData = getCache(cacheKey, cacheTtl);

  if (cachedData) {
    // Returning cached data
    return cachedData;
  }

  if (source) {
    // There was no cached data, so get fresh data
    return await fetchData(source, headers, body, cacheKey);
  } else {
    throw new Error(ERROR_MSG_MISSING_SOURCE_IN_CALL);
  }
}

/**
 * Wrapper for localStorage.clear() and localStorage.removeItem(cacheKey), with some safety checks and other stuff you will probably want.
 *
 * @exports
 * @function
 * @param {string} [cacheKey=null] - Optional: Pass a cacheKey if you need to erase a single item from localStorage; default will clear everything
 * @returns {void}
 */
export function evict(cacheKey = null) {
  evictCache(cacheKey);
}
