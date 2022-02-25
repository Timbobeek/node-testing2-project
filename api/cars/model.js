const db = require("../../data/db-config");

async function getAll() {
  return await db("used_cars");
}

async function get(carId) {
  return await db("used_cars").where({ car_id: carId }).first();
}

async function add(carData) {
  const [id] = await db("used_cars").insert(carData);
  return await db("used_cars").where({ car_id: id }).first();
}

async function remove(carId) {
  const car = await db("used_cars").where({ car_id: id }).first();
  await db("used_cars").where({ car_id: carId }).del();
  return car;
}

module.exports = { getAll, get, add, remove };
