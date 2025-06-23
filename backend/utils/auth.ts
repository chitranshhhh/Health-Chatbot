import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt
 * @param password Plain text password to hash
 * @returns Hashed password
 */
export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * Compares a plain text password with a hashed password
 * @param password Plain text password to check
 * @param hashedPassword Hashed password to compare against
 * @returns boolean indicating if passwords match
 */
export function comparePasswords(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

/**
 * Validates password strength
 * @param password Password to validate
 * @returns boolean indicating if password meets requirements
 */
export function isPasswordStrong(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar;
}