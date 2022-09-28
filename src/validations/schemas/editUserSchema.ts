import * as yup from 'yup';

const editUserSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  password: yup
    .string()
    .min(3, 'Password is of length less than 3')
    .max(20, 'Password too long')
    .required('Password is required')
    .trim(),
  oldPassword: yup.string(),
});

export default editUserSchema;
