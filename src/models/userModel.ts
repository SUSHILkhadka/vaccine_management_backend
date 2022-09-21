import { TABLE_NAME_USER } from '../constants/common';
import db from '../db/db';
import { IUser, IUserToInsert } from '../domains/IUser';

class User {
  private static table = TABLE_NAME_USER;

  public static async createUser(
    userToInsert: IUserToInsert
  ): Promise<IUser[]> {
    try {
      const user = await db(this.table).insert(userToInsert).returning('*');
      return user;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  public static async getUserByEmail(email: string): Promise<IUser> {
    const user = await db(this.table)
      .where('email', email)
      .returning('*')
      .first();
    return user;
  }

  public static async updateUser(user: IUser): Promise<IUser[]> {
    const updatedUser = await db(this.table)
      .where('id', user.id)
      .update(user)
      .returning('*');
    return updatedUser;
  }

  public static async deleteUser(id: number): Promise<IUser> {
    const deletedUser = await db(this.table)
      .where('id', id)
      .del()
      .returning('*');
    return deletedUser[0];
  }
}
export default User;
