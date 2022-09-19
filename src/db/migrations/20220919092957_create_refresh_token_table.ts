import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('refresh_token', (table) => {
    table.string('refresh_token').notNullable();
    table.integer('id').notNullable();
    table.string('expires_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('refresh_token');
}
