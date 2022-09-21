import { NextFunction, Request, Response } from 'express';
import { IVaccineToInsert } from '../domains/IVaccine';
import { InvalidVaccineIdInURL } from '../errors/errors';
import * as VaccineService from '../services/vaccineService';
import formValidator from '../validations/formValidator';
import vaccineSchema from '../validations/vaccineSchema';

export const createVaccine = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vaccineFormData = req.body as IVaccineToInsert;
  formValidator(vaccineFormData, vaccineSchema);

  VaccineService.createVaccine(vaccineFormData)
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
  const vaccineFormData = req.body as IVaccineToInsert;
  formValidator(vaccineFormData, vaccineSchema);

  const id = +req.params.vaccineId;
  if (isNaN(id)) {
    return next(InvalidVaccineIdInURL);
  }

  VaccineService.updateVaccine({
    ...vaccineFormData,
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
  const id = +req.params.vaccineId;
  if (isNaN(id)) {
    return next(InvalidVaccineIdInURL);
  }

  VaccineService.deleteVaccine(id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
