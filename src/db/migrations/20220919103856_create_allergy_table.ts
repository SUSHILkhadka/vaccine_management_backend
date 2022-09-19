import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('allergy', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('vaccine_id').unsigned().notNullable();
    table
      .foreign('vaccine_id')
      .references('id')
      .inTable('vaccine')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('allergy');
}
