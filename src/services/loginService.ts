import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {
  EXPIRY_TIME_ACCESS_TOKEN,
  EXPIRY_TIME_REFRESH_TOKEN,
} from '../constants/common';
import { IDataAtToken } from '../domains/IDataAtToken';
import IRefreshToken from '../domains/IRefreshToken';
import { ISuccess } from '../domains/ISuccess';
import { ITokens } from '../domains/ITokens';
import CustomError from '../misc/CustomError';
import logger from '../misc/Logger';
import RefreshTokenModel from '../models/refreshTokenModel';
import { default as User, default as UserModel } from '../models/userModel';

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
  if (!user) {
    throw new CustomError('no email found', StatusCodes.BAD_REQUEST);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new CustomError('wrong password', StatusCodes.UNAUTHORIZED);
  }

  //valid user
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: EXPIRY_TIME_ACCESS_TOKEN,
    }
  );
  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_TOKEN_SECRET as string
  );

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

export const getAccessToken = async (
  refreshToken: string
): Promise<ITokens<User>> => {
  const refreshTokenFromDb = (await RefreshTokenModel.getRefreshTokenByToken(
    refreshToken
  )) as IRefreshToken;
  if (!refreshTokenFromDb || +refreshTokenFromDb.expiresAt < Date.now()) {
    await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
    throw new CustomError('invalid refresh token', StatusCodes.UNAUTHORIZED);
  }

  try {
    const dataAtToken = jwt.verify(
      refreshToken,
      process.env.JWT_TOKEN_SECRET as string
    ) as IDataAtToken;
    const { id, name, email } = dataAtToken;
    const newAccessToken = jwt.sign(
      { id, name, email },
      process.env.JWT_SECRET as string,
      { expiresIn: EXPIRY_TIME_ACCESS_TOKEN }
    );
    return {
      data: dataAtToken,
      accessToken: newAccessToken,
      refreshToken,
      expiresAtRefreshToken: refreshTokenFromDb.expiresAt,
      message: 'got new access token successfully',
    };
  } catch {
    throw new CustomError('invalid refresh token');
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
