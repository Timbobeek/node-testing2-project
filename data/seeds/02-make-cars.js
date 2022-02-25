const usedCars = [
  { make: "Volkswagen", model: "Jetta", year: 2021, mpg: 31, milage: 100, price: 12000 },
  { make: "Volkswagen", model: "Jetta", year: 1998, mpg: 30, milage: 200, price: 4000 },
  { make: "Subaru", model: "Forester", year: 1997, mpg: 24, milage: 1500, price: 1000 },
];

exports.seed = async function (knex) {
  await knex("used_cars").insert(usedCars);
};
