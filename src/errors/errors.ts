import { StatusCodes } from 'http-status-codes';
import CustomError from '../misc/CustomError';

export const InvaliCredentialsError = new CustomError(
  'Invalid Credentials',
  StatusCodes.BAD_REQUEST
);

export const InvalidRefreshTokenError = new CustomError(
  'Invalid refresh token',
  StatusCodes.UNAUTHORIZED
);

export const InValidAccessTokenError = new CustomError(
  'invalid access token',
  StatusCodes.UNAUTHORIZED
);

export const EmptyVaccineListError = new CustomError(
  'Vaccines list is empty',
  StatusCodes.NOT_FOUND
);

export const VaccineNotFoundError = new CustomError(
  "Vaccine  doesn't exists to edit",
  StatusCodes.NOT_FOUND
);

export const InvalidVaccineIdInURL = new CustomError(
  'vaccine id is not a valid number',
  StatusCodes.BAD_REQUEST
);

export const EmptyAllergyListError = new CustomError(
  'allergies list is empty',
  StatusCodes.NOT_FOUND
);

export const AllergyNotFoundError = new CustomError(
  'allergy doesnot exist to edit',
  StatusCodes.NOT_FOUND
);

export const InvalidAllergyIdInURL = new CustomError(
  'allergy id is not a valid number',
  StatusCodes.BAD_REQUEST
);
