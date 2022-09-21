import * as yup from 'yup';

const allergySchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  vaccineId: yup
    .number()
    .typeError('Vaccine id must be a number')
    .required('Vaccine Id is required'),
});

export default allergySchema;
