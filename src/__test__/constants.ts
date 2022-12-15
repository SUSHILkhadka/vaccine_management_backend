import { IAllergy } from '../interface/IAllergy';
import { IVaccine } from '../interface/IVaccine';

export const vaccine: IVaccine = {
  id: 24,
  name: 'FluMist',
  description: 'Used in Seasonal Flu. Its other name is LAIV.',
  numberOfDoses: 2,
  releaseDate: '2008-01-30',
  photoUrl: '',
  isMandatory: false,
};

export const allergyList: IAllergy[] = [
  {
    id: -1,
    name: 'allery1',
    status: 'added',
  },
  {
    id: 3,
    name: 'allery3',
    status: 'added',
  },
  {
    id: 3,
    name: 'allery3',
    status: 'deleted',
  },
];

export const vaccineArray = [
  {
    id: 1,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: false,
  },
  {
    id: 2,
    name: 'vaccinenameiswired',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: true,
  },
  {
    id: 3,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: false,
  },
  {
    id: 4,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: true,
  },
];
