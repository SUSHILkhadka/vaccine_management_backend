import jwt from 'jsonwebtoken';
import { EXPIRY_TIME_ACCESS_TOKEN } from '../constants/common';
import { IDataAtToken } from '../domains/IDataAtToken';


export const getAccessTokenUtils = (tokenDataToBeEncrypted: IDataAtToken) => {
    const accessToken = jwt.sign(
        tokenDataToBeEncrypted,
        process.env.JWT_SECRET as string,
        {
          expiresIn: EXPIRY_TIME_ACCESS_TOKEN,
        }
      );
      return accessToken;
};

export const getRefreshTokenUtils=(tokenDataToBeEncrypted:IDataAtToken)=>{
    const refreshToken = jwt.sign(
        tokenDataToBeEncrypted,
        process.env.JWT_TOKEN_SECRET as string
      );
    return refreshToken;
}

export const decryptTokenData=(token:string)=>{
    const dataAtToken = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string
      ) as IDataAtToken;
      return dataAtToken;
}