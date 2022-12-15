const token={
  refreshToken: 'token',
  id: 1,
  expiresAt: 10000000,
}
module.exports = {
  createRefreshToken: (refreshtokentoinsert:any) => {
    return token;
  },
  getRefreshTokenByToken:(refreshToken:any)=>{
    return refreshToken
  },
  deleteRefreshTokenByToken:(refreshToken:any)=>{
    return refreshToken
  },
  deleteExpiredRefreshTokenByUserId:(userId:any) =>{
    return token
  }
};
