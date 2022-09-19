export interface IAllergy {
  id: number;
  name: string;
  vaccineId: number;
}
export type IAllergyToInsert = Omit<IAllergy, 'id'>;
