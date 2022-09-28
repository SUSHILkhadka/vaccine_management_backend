import { TABLE_NAME_VACCINE } from '../constants/common';
import db from '../db/db';
import { IVaccine, IVaccineToInsert } from '../domains/IVaccine';

class Patient {
  private static table = TABLE_NAME_VACCINE;

  public static async createVaccine(vaccineToInsert: IVaccineToInsert): Promise<IVaccine> {
    console.log(vaccineToInsert);
    const vaccine = await db(this.table).insert(vaccineToInsert).returning('*');
    return vaccine[0];
  }

  public static async getAllVaccines(): Promise<IVaccine[]> {
    const vaccines = await db(this.table).returning('*');
    return vaccines;
  }

  public static async updateVaccine(vaccine: IVaccine): Promise<IVaccine> {
    const updatedVaccine = await db(this.table).where({ id: vaccine.id }).update(vaccine).returning('*');
    return updatedVaccine[0];
  }

  public static async deleteVaccine(vaccineId: number): Promise<IVaccine> {
    const deletedVaccine = await db(this.table).where({ id: vaccineId }).del().returning('*');
    return deletedVaccine[0];
  }
}
export default Patient;
