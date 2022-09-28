import { Knex } from 'knex';
import { TABLE_NAME_USER } from '../../constants/common';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME_USER, (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME_USER);
}
