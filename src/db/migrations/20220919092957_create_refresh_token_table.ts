import { Knex } from 'knex';
import { TABLE_NAME_REFRESH_TOKEN } from '../../constants/common';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME_REFRESH_TOKEN, (table) => {
    table.string('refresh_token').notNullable();
    table.integer('id').notNullable();
    table.string('expires_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME_REFRESH_TOKEN);
}
