import * as yup from 'yup';

const vaccineSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().nullable(),
  numberOfDoses: yup
    .number()
    .typeError('number of doses must be a number')
    .required('Number of doses is required'),
  releaseDate: yup.date().typeError('release date must be a date').nullable(),
  photoUrl: yup.string().nullable(),
  isMandatory: yup.boolean().typeError('isMandatory should be boolean value'),
});

export default vaccineSchema;
