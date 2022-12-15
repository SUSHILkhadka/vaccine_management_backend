const bcrypt = require('bcrypt');
const { generatePasswordHash } = require('../../utils/passwordUtils');

const {
  addAllergy,
  getAllAllergiesByVaccineId,
  updateAllergy,
  deleteAllergy
} = require('../../services/allergyService');
const { number } = require('yup');
jest.mock('../../models/allergyModel');

const allergyToInsert = {
  name: 'userA',
  vaccineId: 1,
};
const allergyToEdit = {
  id: '1',
  name: 'userA',
  vaccineId: 1,
};

const expectedAllergyToInsert = {
  id: '1',
  name: 'userA',
  vaccineId: 1,
};

const arrayOfAllergy = [
  {
    id: '1',
    name: 'userA',
    vaccineId: 1,
  },
  {
    id: '2',
    name: 'userB',
    vaccineId: 2,
  },
];
const deletedAllergy={
  id:'1',
  name: "userA",
  vaccineId: 1,
}

describe('Allergy services', () => {
  it('should create new allergy', async () => {
    const input = allergyToInsert;
    const output = await addAllergy(input);
    const expectedOutput = {
      data: expectedAllergyToInsert,
      message: 'new allergy created by vaccine id successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should get All Allergies By VaccineId', async () => {
    const input = 1;
    const output = await getAllAllergiesByVaccineId(input);
    const expectedOutput = {
      data: arrayOfAllergy,
      message: 'allergy list by vaccine id fetched successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should update allergy', async () => {
    const input = allergyToEdit;
    const output = await updateAllergy(input);
    const expectedOutput = {
      data: allergyToEdit,
      message: 'updated allergy by id successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should delete allergy', async () => {
    const input = 1;
    const output = await deleteAllergy(input);
    const expectedOutput = {
      data: deletedAllergy,
      message: 'deleted allergy by id successfully',
    }
    expect(output).toEqual(expectedOutput);
  });
});
