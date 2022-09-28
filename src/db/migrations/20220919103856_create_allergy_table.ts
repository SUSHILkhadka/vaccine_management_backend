import { Knex } from 'knex';
import { TABLE_NAME_ALLERGY } from '../../constants/common';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME_ALLERGY, (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('vaccine_id').unsigned().notNullable();
    table.foreign('vaccine_id').references('id').inTable('vaccine').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME_ALLERGY);
}
