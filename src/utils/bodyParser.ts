import { Request } from 'express';
import { IAllergyToInsert } from '../domains/IAllergy';
import { IUserToInsert } from '../domains/IUser';
import { IVaccineToInsert } from '../domains/IVaccine';
export const getSiginFormDataFromRequest = (req: Request): IUserToInsert => {
  const { name, email, password } = req.body;
  return { name, email, password };
};

export const getVaccineDataFromRequest = (req: Request): IVaccineToInsert => {
  const { name, description, numberOfDoses, releaseDate, photoUrl, isMandatory } = req.body;
  return {
    name,
    description,
    numberOfDoses,
    releaseDate,
    photoUrl,
    isMandatory,
  };
};

export const getAllergyDataFromRequest = (req: Request): IAllergyToInsert => {
  const { name, vaccineId } = req.body;
  return { name, vaccineId };
};
