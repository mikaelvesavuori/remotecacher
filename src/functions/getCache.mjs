import { isLocalStorageAvailable } from './isLocalStorageAvailable.mjs';
import { isCachedDataFresh } from './isCachedDataFresh.mjs';

import { ERROR_MSG_GETTING_CACHE_DATA } from './errorHandling.mjs';

/**
 * getCache retrieves cached data from localStorage; default value passed in will be the key set in the constructor
 *
 * @exports
 * @function
 * @param {*} data
 * @typedef {object} data
 * @property {SomeValue} Description
 * @returns {*}
 */
export function getCache(cacheKey, cacheTtl) {
  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MSG_GETTING_CACHE_DATA);
  }

  // Could not find a match with the requested cacheKey
  if (!window.localStorage.getItem(cacheKey)) {
    return null;
  }

  // There was a matching cacheKey; now to make sure it's still fresh/valid
  if (isCachedDataFresh(cacheKey, cacheTtl)) {
    return window.localStorage.getItem(cacheKey)
      ? JSON.parse(window.localStorage.getItem(cacheKey))
      : null;
  }

  return null;
}
