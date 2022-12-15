const bcrypt = require('bcrypt');
const { generatePasswordHash } = require('../../utils/passwordUtils');

const {
  login,
  getNewAccessTokenByRefreshToken,
  logout,
} = require('../../services/loginService');
const { number } = require('yup');
jest.mock('../../models/userModel');
jest.mock('../../models/refreshTokenModel');
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

const user = {
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
};
const tokenData = {
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  expiryDateForRefreshToken: '40s',
};

const token = 'token';
describe('Login services', () => {
  it('should login  user', async () => {
    const output = await login(user.email, user.password);
    const expectedOutput = {
      data: user,
      accessToken: token,
      refreshToken: token,
      message: 'login successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should get new refresh token', async () => {
    const input = token;
    const output = await getNewAccessTokenByRefreshToken(input);
    const expectedOutput = {
      data: tokenData,
      accessToken: token,
      refreshToken: token,
      message: 'got new access token successfully',
    };
    expect(output).toEqual(expectedOutput);
  });

  it('should logout user', async () => {
    const input = 'token';
    const output = await logout(input);
    const expectedOutput = {
      message: 'deleted refresh token successfully',
    };
    expect(output).toEqual(expectedOutput);
  });
});
