import { NextFunction, Request, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { IUserToUpdate } from '../domains/IUser';
import { InValidAccessTokenError } from '../errors/errors';
import * as UserService from '../services/userService';
import { getSiginFormDataFromRequest } from '../utils/bodyParser';
import { keyValueValidator } from '../validations/formValidator';
import signupSchema from '../validations/schemas/signupSchema';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const signinFormData = getSiginFormDataFromRequest(req);

  UserService.createUser(signinFormData)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const checkIfEmailAlreadyExists = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  keyValueValidator('email', email, signupSchema);
  UserService.checkIfEmailAlreadyExists(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { name, password, oldPassword } = req.body as IUserToUpdate;
  const id = req.id;
  const email = req.email;

  if (!id || !email) {
    return next(InValidAccessTokenError);
  }

  UserService.updateUser({ name, password, id, email }, oldPassword)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const id = req.id;
  if (!id) {
    return next(InValidAccessTokenError);
  }

  UserService.deleteUser(id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
