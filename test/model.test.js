const db = require("../data/db-config.js");
const UsedCars = require("../api/model");

afterAll(async () => {
  await db.destroy()
})
beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

describe("Used cars model", () => {
  describe("add()", () => {
    it("should insert the provided cars into the db", async () => {
      await UsedCars.add({
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
        mpg: 31,
        milage: 100,
        price: 12000,
      });
      await UsedCars.add({
        make: "Subaru",
        model: "Forester",
        year: 1997,
        mpg: 24,
        milage: 1500,
        price: 1000,
      });

      const cars = await db("used_cars");

      expect(cars).toHaveLength(2);
    });
  });
});
