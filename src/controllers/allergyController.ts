import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import CustomError from '../misc/CustomError';
import * as AllergyService from '../services/allergyService';
import allergySchema from '../validations/allergySchema';
import formValidator from '../validations/formValidator';

export const addAllergy = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, vaccineId } = req.body;
  formValidator(req.body, allergySchema);

  AllergyService.addAllergy({
    name,
    vaccineId,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllAllergiesByVaccineId = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const vaccineId = req.params.vaccineId;
  AllergyService.getAllAllergiesByVaccineId(+vaccineId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateAllergy = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.allergyId;
  if (isNaN(id)) {
    return next(
      new CustomError(
        'allergy id is not a valid number',
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const { name, vaccineId } = req.body;
  formValidator(req.body, allergySchema);

  AllergyService.updateAllergy({
    name,
    vaccineId,
    id: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteAllergy = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.allergyId;
  if (isNaN(id)) {
    return next(
      new CustomError(
        'allergy id is not a valid number',
        StatusCodes.BAD_REQUEST
      )
    );
  }

  AllergyService.deleteAllergy(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
