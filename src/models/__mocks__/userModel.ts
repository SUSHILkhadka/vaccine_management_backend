
const userAfterAddition=[{
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
}]
const userByEmail={
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
}
const deletedUser={
  id: 1,
  name: 'Sushil Khadka',
  email: 'sushilkhadka@lftechnology.com',
  password: 'password',
}
module.exports = {
  createUser: (userToInsert:any) => {
    return userAfterAddition;
  },
  getUserByEmail: (email:any) => {
    return userByEmail;
  },
  updateUser:(userByEmail:any) =>{
    return userByEmail
  },
  deleteUser:(id:any)=>{
return deletedUser
  }
};
