const bcrypt = require('bcrypt');
const { generatePasswordHash } = require('../../utils/passwordUtils');

const {
  createVaccine,
  getAllVaccines,
  updateVaccine,
  deleteVaccine
} = require('../../services/vaccineService');
const { number } = require('yup');
jest.mock('../../models/vaccineModel');

const vaccineToInsert = {
  name: 'vaccineA',
  description: '',
  numberOfDoses: 1,
  releaseDate: 'Date',
  photoUrl: '',
  isMandatory: false,
};
const vaccineToEdit = {
  id: 1,
  name: 'vaccineA',
  description: '',
  numberOfDoses: 1,
  releaseDate: 'Date',
  photoUrl: '',
  isMandatory: false,
};

const expectedVaccineToAdd = {
  id: 1,
  name: 'vaccineA',
  description: '',
  numberOfDoses: 1,
  releaseDate: 'Date',
  photoUrl: '',
  isMandatory: false,
};
const arrayOfVaccine = [
  {
    id: 1,
    name: 'vaccineA',
    description: '',
    numberOfDoses: 1,
    releaseDate: 'Date',
    photoUrl: '',
    isMandatory: false,
  },
  {
    id: 2,
    name: 'vaccineB',
    description: '',
    numberOfDoses: 2,
    releaseDate: 'Date',
    photoUrl: '',
    isMandatory: true,
  },
];

const deletedVaccine={
  id: 1,
  name: 'vaccineA',
  description: '',
  numberOfDoses: 1,
  releaseDate: 'Date',
  photoUrl: '',
  isMandatory: false,
}

describe('Vaccine services', () => {
  it('should create new vaccine', async () => {
    const input = vaccineToInsert;
    const output = await createVaccine(input);
    const expectedOutput = {
      data: expectedVaccineToAdd,
      message: 'vaccine created successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should get all vaccines', async () => {
    const output = await getAllVaccines();
    const expectedOutput = {
      data: arrayOfVaccine,
      message: 'All vaccines fetched successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should update vaccine', async () => {
    const input = vaccineToEdit;
    const output = await updateVaccine(input);
    const expectedOutput = {
      data: vaccineToEdit,
      message: 'updated Vaccine by id',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should delete vaccine', async () => {
    const input = 1;
    const output = await deleteVaccine(input);
    const expectedOutput = {
      data: deletedVaccine,
      message: 'deleted vaccine by id',
    }
    expect(output).toEqual(expectedOutput);
  });
});
