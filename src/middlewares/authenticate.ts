import { NextFunction, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { InValidAccessTokenError } from '../errors/errors';
import { decryptedTokenDataFromAccessToken } from '../utils/tokenUtils';
/**
 *
 * @param req user Request with access token in header
 * @param res Response
 * @param next NextFunction
 * @returns next function if access token is valid and adds token data to request.
 */
const authenticate = async (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(InValidAccessTokenError);
  }
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const dataAtToken = decryptedTokenDataFromAccessToken(accessToken);
    req.id = dataAtToken.id;
    req.email = dataAtToken.email;
    return next();
  } catch {
    return next(InValidAccessTokenError);
  }
};
export default authenticate;
