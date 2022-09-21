import { TABLE_NAME_ALLERGY } from '../constants/common';
import db from '../db/db';
import { IAllergy, IAllergyToInsert } from '../domains/IAllergy';

class User {
  private static table = TABLE_NAME_ALLERGY;

  public static async addAllergy(
    allergyToInsert: IAllergyToInsert
  ): Promise<IAllergy> {
    const allergies = await db(this.table)
      .insert(allergyToInsert)
      .returning('*');
    return allergies[0];
  }

  public static async getAllAllergiesByVaccineId(
    vaccineId: number
  ): Promise<IAllergy[]> {
    const allergies = await db(this.table)
      .where({ vaccineId: vaccineId })
      .returning('*');
    return allergies;
  }

  public static async updateAllergy(allergy: IAllergy): Promise<IAllergy> {
    const updatedAllergy = await db(this.table)
      .where({ vaccineId: allergy.vaccineId, id: allergy.id })
      .update(allergy)
      .returning('*');
    return updatedAllergy[0];
  }
  public static async deleteAllergy(id: number): Promise<IAllergy> {
    const deletedAllergy = await db(this.table)
      .where('id', id)
      .del()
      .returning('*');
    return deletedAllergy[0];
  }
}
export default User;
