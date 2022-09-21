import { ISuccess } from '../domains/ISuccess';
import { IUser, IUserToInsert } from '../domains/IUser';
import { InvaliCredentialsError } from '../errors/errors';
import logger from '../misc/Logger';
import UserModel from '../models/userModel';
import {
  comparePlainPasswordAndHash,
  generatePasswordHash,
} from '../utils/passwordUtils';

export const createUser = async (
  userToInsert: IUserToInsert
): Promise<ISuccess<IUser>> => {
  const { password } = userToInsert;
  const passwordHash = await generatePasswordHash(password);
  logger.info('creating user');
  const user = await UserModel.createUser({
    ...userToInsert,
    password: passwordHash,
  });

  logger.info('created user successfully');
  return {
    data: user,
    message: 'new user registered successfully',
  };
};

export const getUserByEmail = async (
  email: string
): Promise<ISuccess<IUser>> => {
  logger.info('getting user by email');
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw InvaliCredentialsError;
  }

  logger.info('got user by email successfully');
  return {
    data: user,
    message: 'user by email fetched successfully',
  };
};

export const updateUser = async (
  user: IUser,
  oldPassword: string
): Promise<ISuccess<IUser>> => {
  logger.info('updating user');

  const userForCheck = await UserModel.getUserByEmail(user.email);
  const isPasswordMatch = await comparePlainPasswordAndHash(
    oldPassword,
    userForCheck.password
  );
  if (!isPasswordMatch) {
    throw InvaliCredentialsError;
  }

  // entered correct old password for changing name or password or both
  const password = user.password;
  const passwordHash = await generatePasswordHash(password);
  logger.info('updating user');
  const updatedUser = await UserModel.updateUser({
    ...user,
    password: passwordHash,
  });

  logger.info('updated user successfully');
  return {
    data: updatedUser,
    message: 'user updated successfully',
  };
};

export const deleteUser = async (id: number): Promise<ISuccess<IUser>> => {
  logger.info('deleting user');
  const deletedUser = await UserModel.deleteUser(id);
  logger.info('deleted user successfully');

  return {
    data: deletedUser,
    message: 'user by id deleted successfully',
  };
};
