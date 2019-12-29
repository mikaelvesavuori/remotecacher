import { setCache } from './setCache.mjs';

import { ERROR_MSG_NO_FETCH } from './errorHandling.mjs';

/**
 * fetchData does the actual work involved in getting the data; if there is cached fresh data then it returns that, else gets new data
 *
 * @async
 * @function
 * @throws Will throw an error if there is a fetching problem
 * @returns
 */
export async function fetchData(source, headers, body, cacheKey) {
  if (!window || !window.fetch) {
    throw new Error(ERROR_MSG_NO_FETCH);
  }

  //console.log('Getting fresh data...');

  return await fetch(source, {
    ...headers,
    body: body !== null ? JSON.stringify(body) : body
  })
    .then(res => res.json())
    .then(data => {
      return setCache(
        {
          ...data,
          timestamp: Date.now()
        },
        cacheKey
      );
    })
    .catch(error => {
      throw new Error('Error occurred while fetching', error);
    });
}
