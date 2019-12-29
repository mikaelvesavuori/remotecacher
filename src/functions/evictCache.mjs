import {
  ERROR_MSG_NO_LOCALSTORAGE,
  ERROR_MSG_NO_MATCHING_KEY_IN_LOCALSTORAGE
} from './errorHandling.mjs';

/**
 * evictCache clears localStorage
 *
 * @exports
 * @function
 * @param {string} [cacheKey] - Optional: Erases cacheKey from localStorage. If no cacheKey is passed, a complete localStorage.clear() will happen.
 * @return {void}
 */
export function evictCache(cacheKey) {
  if (!window.localStorage) {
    throw new Error(ERROR_MSG_NO_LOCALSTORAGE);
  }

  if (cacheKey && typeof cacheKey === 'string') {
    try {
      window.localStorage.removeItem(cacheKey);
    } catch (error) {
      throw new Error(ERROR_MSG_NO_MATCHING_KEY_IN_LOCALSTORAGE, error);
    }
  } else {
    window.localStorage.clear();
  }
}
