import { NextFunction, Request, Response } from 'express';
import { InvalidRefreshTokenError } from '../errors/errors';
import * as LoginService from '../services/loginService';

/**
 *
 * @param req request from user
 * @param res response after processing req
 * @param next next function
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  LoginService.login(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getNewAccessTokenByRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw InvalidRefreshTokenError;
  }
  LoginService.getNewAccessTokenByRefreshToken(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw InvalidRefreshTokenError;
  }
  LoginService.logout(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
