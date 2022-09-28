import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema } from 'yup';
import formValidator from '../validations/formValidator';

export const validate = (schema: AnyObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  formValidator(req.body, schema);
  next();
};
