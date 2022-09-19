import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('vaccine', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
    table.string('number_of_doses');
    table.date('release_date');
    table.string('photo_url');
    table.boolean('is_mandatory').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('vaccine');
}
