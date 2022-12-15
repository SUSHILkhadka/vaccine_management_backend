const bcrypt = require('bcrypt');
const { generatePasswordHash } = require('../../utils/passwordUtils');

const {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require('../../services/userService');
const { number } = require('yup');
jest.mock('../../models/userModel');
jest.mock('bcrypt', () => {
  return {
    compare: (plainPassword, hash) => {
      return true;
    },
    genSalt: (round) => {
      return 'salt';
    },
    hash: (password, salt) => {
      return 'password';
    },
  };
});
const userToInsert = {
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
};

const userAfterAddition = [
  {
    id: 1,
    name: 'Sushil Khadka',
    email: 'sushilkhadka@lftechnology.com',
    password: 'password',
  },
];
const userByEmail = {
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
};

const deletedUser = {
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
};
describe('User services', () => {
  it('should create new user', async () => {
    const input = userToInsert;
    const output = await createUser(input);
    const expectedOutput = {
      data: userAfterAddition,
      message: 'new user registered successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should get user by email vaccines', async () => {
    const input = userToInsert.email;
    const output = await getUserByEmail(input);
    const expectedOutput = {
      data: userByEmail,
      message: 'user by email fetched successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should update user', async () => {
    const input = userByEmail;
    const output = await updateUser(input);
    const expectedOutput = {
      data: userByEmail,
      message: 'user updated successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should delete user', async () => {
    const input = 1;
    const output = await deleteUser(1);
    const expectedOutput = {
      data: deletedUser,
      message: 'user by id deleted successfully',
    };
    expect(output).toEqual(expectedOutput);
  });
});
