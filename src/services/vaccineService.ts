import StatusCodes from 'http-status-codes';
import { ISuccess } from '../domains/ISuccess';
import { IVaccine, IVaccineToInsert } from '../domains/IVaccine';
import CustomError from '../misc/CustomError';
import logger from '../misc/Logger';
import VaccineModel from '../models/vaccineModel';

export const createVaccine = async (
  vaccineToInsert: IVaccineToInsert
): Promise<ISuccess<IVaccine>> => {
  logger.info('creating vaccine');
  const vaccine = await VaccineModel.createVaccine(vaccineToInsert);

  logger.info('created vaccine successfully');
  return {
    data: vaccine,
    message: 'vaccine created successfully',
  };
};

export const getAllVaccines = async (): Promise<ISuccess<IVaccine[]>> => {
  logger.info('getting all vaccine');
  const vaccines = await VaccineModel.getAllVaccines();
  if (!vaccines.length) {
    throw new CustomError('Vaccines  doesnot exists', StatusCodes.NOT_FOUND);
  }

  logger.info('got all vaccines successfully');
  return {
    data: vaccines,
    message: 'All vaccines fetched successfully',
  };
};

export const updateVaccine = async (
  vaccine: IVaccine
): Promise<ISuccess<IVaccine>> => {
  logger.info('updating contact by userId from token data and id');
  const updatedVaccine = await VaccineModel.updateVaccine(vaccine);
  if (!updatedVaccine) {
    throw new CustomError(
      "Vaccine  doesn't exists to edit",
      StatusCodes.NOT_FOUND
    );
  }

  logger.info('updated Vaccine by userId and id successfully');
  return {
    data: updatedVaccine,
    message: 'updated Vaccine by userId and id successfully',
  };
};

export const deleteVaccine = async (
  id: number
): Promise<ISuccess<IVaccine>> => {
  logger.info('updating contact by userId from token data and id');
  const contact = await VaccineModel.deleteVaccine(id);
  if (!contact) {
    throw new CustomError(
      'Couldnot delete the requested contact',
      StatusCodes.NOT_FOUND
    );
  }

  logger.info('deleted contacts by userId and id successfully');
  return {
    data: contact,
    message: 'deleted contact by userId and id successfully',
  };
};