import { isLocalStorageAvailable } from './isLocalStorageAvailable.mjs';

import {
  ERROR_MSG_GETTING_CACHE_DATA,
  ERROR_MSG_NO_OR_INVALID_DATA,
  ERROR_MSG_DATA_COULD_NOT_BE_STORED
} from './errorHandling.mjs';

/**
 * setCache attempts to cache data in localStorage; default value of cacheKey will be the key set in the constructor
 *
 * @exports
 * @function
 * @param {object} data
 * @param {number} cacheKey
 * @returns {void}
 */
export function setCache(data, cacheKey) {
  if (!data || !cacheKey) {
    throw new Error(ERROR_MSG_NO_OR_INVALID_DATA);
  }

  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MSG_GETTING_CACHE_DATA);
  }

  try {
    if (typeof data === 'object') {
      window.localStorage.setItem(cacheKey, JSON.stringify(data));
      return JSON.parse(window.localStorage.getItem(cacheKey));
    } else {
      window.localStorage.setItem(cacheKey, data);
      return JSON.parse(window.localStorage.getItem(cacheKey));
    }
  } catch (error) {
    throw new Error(ERROR_MSG_DATA_COULD_NOT_BE_STORED, error);
  }
}
