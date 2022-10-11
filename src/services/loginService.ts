import dotenv from 'dotenv';
import { EXPIRY_TIME_REFRESH_TOKEN } from '../constants/common';
import { IDataAtToken } from '../domains/IDataAtToken';
import IRefreshToken from '../domains/IRefreshToken';
import { ISuccess } from '../domains/ISuccess';
import { ITokens } from '../domains/ITokens';
import { InvaliCredentialsError, InvalidRefreshTokenError } from '../errors/errors';
import logger from '../misc/Logger';
import RefreshTokenModel from '../models/refreshTokenModel';
import { default as User, default as UserModel } from '../models/userModel';
import { comparePlainPasswordAndHash } from '../utils/passwordUtils';
import { decryptTokenDataFromRefreshToken, getAccessToken, getRefreshToken } from '../utils/tokenUtils';
dotenv.config();

/**
 *
 * @param email valid email as string
 * @param password valid password as string
 * @returns compares password hash and given password, if correct, returns access token and refresh token
 */
export const login = async (email: string, password: string): Promise<ITokens<User>> => {
  logger.info('logging in');
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw InvaliCredentialsError;
  }
  const isPasswordMatch = await comparePlainPasswordAndHash(password, user.password);
  if (!user || !isPasswordMatch) {
    throw InvaliCredentialsError;
  }

  //valid user
  const expiryDateForRefreshToken = Date.now() + EXPIRY_TIME_REFRESH_TOKEN;

  const tokenDataToBeEncrypted = {
    id: user.id,
    name: user.name,
    email: user.email,
    expiryDateForRefreshToken,
  };
  const accessToken = getAccessToken(tokenDataToBeEncrypted);
  const refreshToken = getRefreshToken(tokenDataToBeEncrypted);

  //delete previous expired refresh token of userId
  await RefreshTokenModel.deleteExpiredRefreshTokenByUserId(user.id);

  //adding new refresh token to database
  await RefreshTokenModel.createRefreshToken({
    refreshToken,
    id: user.id,
    expiresAt: expiryDateForRefreshToken,
  });

  logger.info('logged in successfully');
  return {
    data: user,
    accessToken,
    refreshToken,
    message: 'login successfully',
  };
};

/**
 *
 * @param refreshToken valid refreshtoken for getting new accesstoken after access toekn is expired
 * @returns new access token with new expiry time
 */
export const getNewAccessTokenByRefreshToken = async (refreshToken: string): Promise<ITokens<User>> => {
  logger.info('getting new access token');
  const refreshTokenFromDb = (await RefreshTokenModel.getRefreshTokenByToken(refreshToken)) as IRefreshToken;

  if (!refreshTokenFromDb || +refreshTokenFromDb.expiresAt < Date.now()) {
    await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
    throw InvalidRefreshTokenError;
  }
  const decryptedTokenData = decryptTokenDataFromRefreshToken(refreshToken) as IDataAtToken;
  if (decryptedTokenData.expiryDateForRefreshToken < Date.now()) {
    await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
    throw InvalidRefreshTokenError;
  }
  const newAccessToken = getAccessToken(decryptedTokenData);
  logger.info('got new access token sucessfully');

  return {
    data: decryptedTokenData,
    accessToken: newAccessToken,
    refreshToken,
    message: 'got new access token successfully',
  };
};

/**
 *
 * @param refreshToken current refresh token as string
 * @returns deletes refresh token from database and return deleted token
 */
export const logout = async (refreshToken: string): Promise<ISuccess<IRefreshToken>> => {
  logger.info('logging out');

  await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
  logger.info('logged out successfully');

  return {
    message: 'deleted refresh token successfully',
  };
};
