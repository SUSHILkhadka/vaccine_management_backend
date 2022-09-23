import dotenv from 'dotenv';
import { EXPIRY_TIME_REFRESH_TOKEN } from '../constants/common';
import IRefreshToken from '../domains/IRefreshToken';
import { ISuccess } from '../domains/ISuccess';
import { ITokens } from '../domains/ITokens';
import {
  InvaliCredentialsError,
  InvalidRefreshTokenError,
} from '../errors/errors';
import logger from '../misc/Logger';
import RefreshTokenModel from '../models/refreshTokenModel';
import { default as User, default as UserModel } from '../models/userModel';
import { comparePlainPasswordAndHash } from '../utils/passwordUtils';
import {
  decryptTokenDataFromRefreshToken,
  getAccessToken,
  getRefreshToken,
} from '../utils/tokenUtils';
dotenv.config();

/**
 *
 * @param email valid email as string
 * @param password valid password as string
 * @returns compares password hash and given password, if correct, returns access token and refresh token
 */
export const login = async (
  email: string,
  password: string
): Promise<ITokens<User>> => {
  logger.info('logging in');
  const user = await UserModel.getUserByEmail(email);
  const isPasswordMatch = await comparePlainPasswordAndHash(
    password,
    user.password
  );
  if (!user || !isPasswordMatch) {
    throw InvaliCredentialsError;
  }

  //valid user
  const tokenDataToBeEncrypted = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const accessToken = getAccessToken(tokenDataToBeEncrypted);
  const refreshToken = getRefreshToken(tokenDataToBeEncrypted);

  //delete previous expired refresh token of userId
  await RefreshTokenModel.deleteExpiredRefreshTokenByUserId(user.id);

  //adding new refresh token to database
  const expiryDateForRefreshToken = Date.now() + EXPIRY_TIME_REFRESH_TOKEN;

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
    expiresAtRefreshToken: expiryDateForRefreshToken,
    message: 'login successfully',
  };
};

/**
 *
 * @param refreshToken valid refreshtoken for getting new accesstoken after access toekn is expired
 * @returns new access token with new expiry time
 */
export const getNewAccessTokenByRefreshToken = async (
  refreshToken: string
): Promise<ITokens<User>> => {
  const refreshTokenFromDb = (await RefreshTokenModel.getRefreshTokenByToken(
    refreshToken
  )) as IRefreshToken;

  if (!refreshTokenFromDb || +refreshTokenFromDb.expiresAt < Date.now()) {
    await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
    throw InvalidRefreshTokenError;
  }

  try {
    const decryptedTokenData = decryptTokenDataFromRefreshToken(refreshToken);
    const newAccessToken = getAccessToken(decryptedTokenData);
    return {
      data: decryptedTokenData,
      accessToken: newAccessToken,
      refreshToken,
      expiresAtRefreshToken: refreshTokenFromDb.expiresAt,
      message: 'got new access token successfully',
    };
  } catch {
    throw InvalidRefreshTokenError;
  }
};

/**
 *
 * @param refreshToken current refresh token as string
 * @returns deletes refresh token from database and return deleted token
 */
export const logout = async (
  refreshToken: string
): Promise<ISuccess<IRefreshToken>> => {
  await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
  return {
    message: 'deleted refresh token successfully',
  };
};
