import * as yup from 'yup';

const vaccineSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().nullable(),
  numberOfDoses: yup.number().required('Number of doses is required'),
  releaseDate: yup.date().nullable(),
  photoUrl: yup.string().nullable(),
  isMandatory: yup.boolean(),
});

export default vaccineSchema;
