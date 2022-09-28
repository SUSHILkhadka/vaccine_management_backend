import { StatusCodes } from 'http-status-codes';
import CustomError from '../misc/CustomError';

export const InvaliCredentialsError = new CustomError('Invalid Credentials', StatusCodes.BAD_REQUEST);

export const InvalidRefreshTokenError = new CustomError('Invalid refresh token', StatusCodes.UNAUTHORIZED);

export const InValidAccessTokenError = new CustomError('Invalid access token', StatusCodes.UNAUTHORIZED);

export const EmptyVaccineListError = new CustomError('Vaccines list is empty', StatusCodes.NOT_FOUND);

export const VaccineNotFoundError = new CustomError("Vaccine  doesn't exists to edit", StatusCodes.NOT_FOUND);

export const InvalidVaccineIdInURL = new CustomError('Vaccine id is not a valid number', StatusCodes.BAD_REQUEST);

export const EmptyAllergyListError = new CustomError('Allergies list is empty', StatusCodes.NOT_FOUND);

export const AllergyNotFoundError = new CustomError('Allergy doesnot exist to edit', StatusCodes.NOT_FOUND);

export const InvalidAllergyIdInURL = new CustomError('Allergy id is not a valid number', StatusCodes.BAD_REQUEST);
