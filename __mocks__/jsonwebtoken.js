const tokenData = {
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  expiryDateForRefreshToken: '40s',
};
module.exports = {
  sign: (tokendata, secret, obj = { expiresIn: '40s' }) => {
    return 'token';
  },
  verify: (token, secret) => {
    return tokenData
  },
};
