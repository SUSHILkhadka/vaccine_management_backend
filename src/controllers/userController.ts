import { NextFunction, Request, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { IUserToInsert, IUserToUpdate } from '../domains/IUser';
import { InValidAccessTokenError } from '../errors/errors';
import * as UserService from '../services/userService';
import editUserSchema from '../validations/editUserSchema';
import formValidator from '../validations/formValidator';
import signupSchema from '../validations/signupSchema';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const signinFormData = req.body as IUserToInsert;
  formValidator(signinFormData, signupSchema);

  UserService.createUser(signinFormData)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateUser = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, password, oldPassword } = req.body as IUserToUpdate;
  const id = req.id;
  const email = req.email;
  formValidator(req.body as IUserToUpdate, editUserSchema);
  if (!id || !email) {
    return next(InValidAccessTokenError);
  }

  UserService.updateUser({ name, password, id, email }, oldPassword)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteUser = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = req.id;
  if (!id) {
    return next(InValidAccessTokenError);
  }

  UserService.deleteUser(id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
