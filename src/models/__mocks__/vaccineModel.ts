
const expectedVaccineToAdd={
  id: 1,
  name: 'vaccineA',
  description: '',
  numberOfDoses: 1,
  releaseDate: 'Date',
  photoUrl: '',
  isMandatory: false,
}
const arrayOfVaccine=[
  {
    id: 1,
    name: 'vaccineA',
    description: '',
    numberOfDoses: 1,
    releaseDate: 'Date',
    photoUrl: '',
    isMandatory: false,
  },
  {
    id: 2,
    name: 'vaccineB',
    description: '',
    numberOfDoses: 2,
    releaseDate: 'Date',
    photoUrl: '',
    isMandatory: true,
  }
]

const deletedVaccine={
  id: 1,
  name: 'vaccineA',
  description: '',
  numberOfDoses: 1,
  releaseDate: 'Date',
  photoUrl: '',
  isMandatory: false,
}
module.exports = {
  createVaccine: (vaccineToAdd:any) => {
    return expectedVaccineToAdd;
  },
  getAllVaccines: () => {
    return arrayOfVaccine;
  },
  updateVaccine:(vaccineToEdit:any) =>{
    return vaccineToEdit
  },
  deleteVaccine:(vaccineToEdit:any) =>{
    return deletedVaccine
  }
};
