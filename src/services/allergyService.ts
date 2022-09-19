import StatusCodes from 'http-status-codes';
import { IAllergy, IAllergyToInsert } from '../domains/IAllergy';
import { ISuccess } from '../domains/ISuccess';
import CustomError from '../misc/CustomError';
import logger from '../misc/Logger';
import AllergyModel from '../models/allergyModel';

export const addAllergy = async (
  allergyToInsert: IAllergyToInsert
): Promise<ISuccess<IAllergy>> => {
  logger.info('creating new allergy by vaccine id');
  const allergy = await AllergyModel.addAllergy(allergyToInsert);

  logger.info('created new allergy by vaccine id successfully');
  return {
    data: allergy,
    message: 'new allergy created by vaccine id successfully',
  };
};
export const getAllAllergiesByVaccineId = async (
  patientId: number
): Promise<ISuccess<IAllergy[]>> => {
  logger.info('fetching all allergies by vaccine id = ' + patientId);
  const allergies = await AllergyModel.getAllAllergiesByVaccineId(patientId);
  if (!allergies.length) {
    throw new CustomError('allergies list is empty', StatusCodes.NOT_FOUND);
  }

  logger.info('allergy list by vaccine id fetched successfully ');
  return {
    data: allergies,
    message: 'allergy list by vaccine id fetched successfully',
  };
};

export const updateAllergy = async (
  allergy: IAllergy
): Promise<ISuccess<IAllergy>> => {
  logger.info('updating allergy  by id = ' + allergy.id);
  const updatedAllergy = await AllergyModel.updateAllergy(allergy);
  if (!updatedAllergy) {
    throw new CustomError(
      'allergy doesnot exist to edit',
      StatusCodes.NOT_FOUND
    );
  }
  logger.info('updated allergy by id successfully');
  return {
    data: updatedAllergy,
    message: 'updated allergy by id successfully',
  };
};

export const deleteAllergy = async (
  id: number
): Promise<ISuccess<IAllergy>> => {
  logger.info('deleting allergy by id = ' + id);
  const patient = await AllergyModel.deleteAllergy(id);
  if (!patient) {
    throw new CustomError(
      'allergy doesnot exist to delete',
      StatusCodes.NOT_FOUND
    );
  }
  logger.info('deleted allergy by id successfully');
  return {
    data: patient,
    message: 'deleted allergy by id successfully',
  };
};
