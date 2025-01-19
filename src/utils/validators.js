/**
 * Verifies if the email has a correct format
 * @param {string} email the email to be checked
 * @returns true if it has a valid mail format, false otherwise
 */
export function isValidEmailFormat(email) {
  if (typeof email !== 'string') {
    return false;
  }

  return /^\S+@\S+\.\S+$/.test(email);
}

/**
 * Validates that the password matches the following criteria:
 * At least 8 characters, an upper case, a lower case, a number and a special character.
 * @param {string} password value to be validated
 * @returns true if the password has a valid format, false otherwise
 */
export function isValidPasswordFormat(password) {
  if (typeof password !== 'string') {
    return false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Checks if an object is empty.
 * @param {object} value the object to be tested
 * @returns true if the object doesn't contain keys
 */
export function isEmptyObject(value) {
  return typeof value === 'object' && Object.keys(value).length === 0;
}
