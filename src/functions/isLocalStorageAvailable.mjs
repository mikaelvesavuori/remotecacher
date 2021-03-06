import { ERROR_MSG_NO_WINDOW } from './errorHandling.mjs';

/**
 * isLocalStorageAvailable checks for the availability of localStorage in the Window object
 *
 * @exports
 * @function
 * @throws {error} - Throws error if there is no window object
 * @returns {void}
 */
export function isLocalStorageAvailable() {
  // Check if this is client-side, and has Window object
  try {
    return window.localStorage ? true : false;
  } catch (error) {
    throw new Error(ERROR_MSG_NO_WINDOW, error);
  }
}
