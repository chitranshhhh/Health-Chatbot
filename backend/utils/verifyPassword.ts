import bcrypt from 'bcryptjs';

/**
 * Verifies if a provided password matches a hashed password
 * @param inputPassword - The plain text password to verify
 * @param hashedPassword - The stored hashed password to compare against
 * @returns Promise<boolean> - True if passwords match, false otherwise
 */
export async function verifyPassword(
  inputPassword: string, 
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}

/**
 * Synchronous version of password verification
 * Use this only when async operation is not possible
 */
export function verifyPasswordSync(
  inputPassword: string, 
  hashedPassword: string
): boolean {
  try {
    return bcrypt.compareSync(inputPassword, hashedPassword);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}