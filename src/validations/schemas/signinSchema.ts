import * as yup from 'yup';

const signinSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default signinSchema;
