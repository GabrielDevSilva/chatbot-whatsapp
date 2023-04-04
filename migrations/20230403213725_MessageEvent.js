/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("MessageEvent", function (table) {
    table.increments("id");
    table.string("senderName");
    table.string("senderNumber");
    table.datetime("createdAt");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropSchema("MessageEvent");
};
