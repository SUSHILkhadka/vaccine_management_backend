import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constants/common';

/**
 *
 * @param password raw password as string to be hashed
 * @returns hash of raw password
 */
export const generatePasswordHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

export const comparePlainPasswordAndHash = async (plainPassword: string, hasedPassword: string) => {
  const isPasswordMatch = await bcrypt.compare(plainPassword, hasedPassword);
  return isPasswordMatch;
};
