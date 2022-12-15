const { default: formValidator } = require('../../validations/formValidator');
const {default: vaccineSchema} = require('../../validations/schemas/vaccineSchema');

const validVaccineData={
  name: 'vaccineA',
  numberOfDoses: 1,
  releaseDate: '2020-02-12',
  photoUrl: 'a',
  isMandatory: true,
}
const invalidVaccineData={
  name: '',
  numberOfDoses: 'NaN',
  releaseDate: '2020-02-12',
  photoUrl: 'a',
  isMandatory: true,
}
describe('Login services', () => {
  it('should return empty string array when valid data is entered ', async () => {
    const input = validVaccineData;
    const output = await formValidator(input,vaccineSchema);
    const expectedOutput = []
    expect(output).toEqual(expectedOutput);
  });
  it('should give validation error when invalid data is entered ', async () => {
    const input = invalidVaccineData;
    expect(()=>formValidator(input,vaccineSchema)).toThrow()
  });
});
