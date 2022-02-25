exports.up = async function (knex) {
  await knex.schema.createTable("used_cars", (table) => {
    table.increments("car_id");
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.integer("year").notNullable();
    table.integer("mpg").notNullable();
    table.integer("milage").notNullable();
    table.integer("price").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("used_cars");
};
