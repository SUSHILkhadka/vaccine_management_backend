import { Knex } from 'knex';
import { TABLE_NAME_VACCINE } from '../../constants/common';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME_VACCINE, (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
    table.integer('number_of_doses');
    table.date('release_date');
    table.string('photo_url');
    table.boolean('is_mandatory').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME_VACCINE);
}
