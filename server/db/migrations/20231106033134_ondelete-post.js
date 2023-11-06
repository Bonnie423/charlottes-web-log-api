/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return await knex.schema.alterTable('Comments', table =>{
    table.foreign('post_id').references('Posts.id').onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return await knex.schema.alterTable('Comments', table =>{
    table.foreign('post_id').references('Posts.id').onDelete('NO ACTION')
  })
}
