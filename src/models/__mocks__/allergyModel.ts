
const expectedAllergyToInsert={
  id:'1',
  name: "userA",
  vaccineId: 1,
}
const deletedAllergy={
  id:'1',
  name: "userA",
  vaccineId: 1,
}
const arrayOfAllergy=[
  {
    id:'1',
    name: "userA",
    vaccineId: 1,
  },
  {
    id:'2',
    name: "userB",
    vaccineId: 2,
  }
]

module.exports = {
  addAllergy: (allergyToInsert:any) => {
    return expectedAllergyToInsert;
  },
  getAllAllergiesByVaccineId: (patientId:any) => {
    return arrayOfAllergy;
  },
  updateAllergy:(allergyToEdit:any) =>{
    return allergyToEdit
  },
  deleteAllergy:(id:any)=>{
return deletedAllergy;
  }
};
