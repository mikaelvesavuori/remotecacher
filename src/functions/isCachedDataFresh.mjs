import { isLocalStorageAvailable } from './isLocalStorageAvailable.mjs';

import { ERROR_MSG_NO_WINDOW, ERROR_MSG_UNABLE_TO_RETURN_CACHED_DATA } from './errorHandling.mjs';

/**
 * isCachedDataFresh checks if data has already been fetched within the maximum lifetime span
 *
 * @exports
 * @function
 * @param {number} cacheTtl
 * @param {string} cacheKey
 * @returns {boolean}
 */
export function isCachedDataFresh(cacheKey, cacheTtl) {
  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MSG_NO_WINDOW);
  }

  if (!window.localStorage.getItem(cacheKey)) {
    return false;
  }

  try {
    const CACHED_DATA = JSON.parse(window.localStorage.getItem(cacheKey));
    const MAX_LIFETIME = CACHED_DATA.timestamp + cacheTtl * 1000; // Multiply by milliseconds

    //console.log('Is data still fresh/valid?', Date.now() <= MAX_LIFETIME);

    // Returns true if we have not yet passed the maximum lifetime (measured in seconds, according to Unix format)
    return Date.now() <= MAX_LIFETIME;
  } catch (error) {
    throw new Error(ERROR_MSG_UNABLE_TO_RETURN_CACHED_DATA, error);
  }
}
