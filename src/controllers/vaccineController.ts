import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IRequestWithTokenData } from "../domains/IRequestWithTokenData";
import CustomError from "../middlewares/CustomError";
import * as VaccineService from "../services/vaccineService";
import contactSchema from "../validations/contactSchema";
import formValidator from '../validations/formValidator';

export const createContact = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    workNumber,
    homeNumber,
    phoneNumber,
    photograph,
    favourite,
  } = req.body;

  formValidator(req.body, contactSchema);
  const userId = req.id;
  if (!userId) {
    return next(
      new CustomError("invalid access token", StatusCodes.BAD_REQUEST)
    );
  }
  VaccineService.createContact({
    name,
    email,
    workNumber,
    homeNumber,
    phoneNumber,
    photograph,
    favourite,
    userId,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllContactsByUserId = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const userId = req.id;
  if (!userId) {
    return next(
      new CustomError("invalid access token", StatusCodes.BAD_REQUEST)
    );
  }
  VaccineService.getAllContactsByUserId(userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const updateContact = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    workNumber,
    homeNumber,
    phoneNumber,
    photograph,
    favourite,
  } = req.body;
  Validator(req.body, contactSchema);
  const userId = req.id;
  const id = req.params.contactId;
  if (!userId || !id) {
    return next(
      new CustomError("invalid access token", StatusCodes.BAD_REQUEST)
    );
  }
  VaccineService.updateContact({
    name,
    email,
    workNumber,
    homeNumber,
    phoneNumber,
    photograph,
    favourite,
    userId,
    id: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteContact = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const userId = req.id;
  const id = req.params.contactId;
  if (!userId || !id) {
    return next(
      new CustomError("invalid access token", StatusCodes.BAD_REQUEST)
    );
  }
  VaccineService.deleteContact(userId, +id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
