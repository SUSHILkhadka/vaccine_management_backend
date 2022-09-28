import { NextFunction, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { InvalidAllergyIdInURL, InvalidVaccineIdInURL } from '../errors/errors';
import * as AllergyService from '../services/allergyService';
import { getAllergyDataFromRequest } from '../utils/bodyParser';

export const addAllergy = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const allergyFormData = getAllergyDataFromRequest(req);

  AllergyService.addAllergy(allergyFormData)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllAllergiesByVaccineId = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const vaccineId = +req.params.vaccineId;
  if (isNaN(vaccineId)) {
    return next(InvalidVaccineIdInURL);
  }
  AllergyService.getAllAllergiesByVaccineId(+vaccineId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateAllergy = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const id = +req.params.allergyId;
  if (isNaN(id)) {
    return next(InvalidAllergyIdInURL);
  }

  const alleryFormData = getAllergyDataFromRequest(req);

  AllergyService.updateAllergy({
    ...alleryFormData,
    id: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteAllergy = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const id = +req.params.allergyId;
  if (isNaN(id)) {
    return next(InvalidAllergyIdInURL);
  }

  AllergyService.deleteAllergy(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
