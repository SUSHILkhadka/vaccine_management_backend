import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../misc/CustomError';
import * as VaccineService from '../services/vaccineService';
import formValidator from '../validations/formValidator';
import vaccineSchema from '../validations/vaccineSchema';

export const createVaccine = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    description,
    numberOfDoses,
    releaseDate,
    photoUrl,
    isMandatory,
  } = req.body;
  formValidator(req.body, vaccineSchema);

  VaccineService.createVaccine({
    name,
    description,
    numberOfDoses,
    releaseDate,
    photoUrl,
    isMandatory,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllVaccines = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  VaccineService.getAllVaccines()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateVaccine = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    description,
    numberOfDoses,
    releaseDate,
    photoUrl,
    isMandatory,
  } = req.body;
  formValidator(req.body, vaccineSchema);
  const id = req.params.vaccineId;
  if (!id) {
    return next(
      new CustomError('vaccine id is missing', StatusCodes.BAD_REQUEST)
    );
  }

  VaccineService.updateVaccine({
    name,
    description,
    numberOfDoses,
    releaseDate,
    photoUrl,
    isMandatory,
    id: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteVaccine = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.vaccineId;
  if (!id) {
    return next(
      new CustomError('vaccine id is missing', StatusCodes.BAD_REQUEST)
    );
  }

  VaccineService.deleteVaccine(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
