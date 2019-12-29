import { isLocalStorageAvailable } from './isLocalStorageAvailable.mjs';
import { isCachedDataFresh } from './isCachedDataFresh.mjs';

import { ERROR_MSG_GETTING_CACHE_DATA } from './errorHandling.mjs';

/**
 * getCache retrieves cached data from localStorage. Default value passed in will be the key set in the constructor.
 *
 * @exports
 * @function
 * @param {string} cacheKey - Cache key to get in localStorage
 * @param {number} cacheTtl - Cache time-to-live in seconds
 * @returns {object|null} - Returns found data if anything is there, else it's null
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
