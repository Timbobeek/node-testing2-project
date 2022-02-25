const db = require("../data/db-config.js");
const UsedCars = require("../api/cars/model");

afterAll(async () => {
  await db.destroy();
});

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

const jetta = {
  car_id: 1,
  make: "Volkswagen",
  model: "Jetta",
  year: 2021,
  mpg: 31,
  milage: 100,
  price: 12000,
};

const forester = {
  car_id: 2,
  make: "Subaru",
  model: "Forester",
  year: 1997,
  mpg: 24,
  milage: 1500,
  price: 1000,
};

describe("Used cars model", () => {
  describe("add()", () => {
    it("should insert the provided cars into the db", async () => {
      await UsedCars.add(jetta);
      await UsedCars.add(forester);

      const cars = await db("used_cars");
      expect(cars).toHaveLength(2);
    });
  });

  describe("get()", () => {
    beforeEach(async () => {
      await db("used_cars").insert(jetta);
    });

    it("should return a car by ID", async () => {
      const actual = await UsedCars.get(jetta.car_id);
      expect(actual).toEqual(jetta);
    });
  });

  describe("getАll()", () => {
    beforeEach(async () => {
      await db("used_cars").insert(jetta);
      await db("used_cars").insert(forester);
    });

    it("should return all cars", async () => {
      const actual = await UsedCars.getAll();
      expect(actual).toContainEqual(jetta);
      expect(actual).toContainEqual(forester);
    });
  });
  describe("remove()", () => {
    beforeEach(async () => {
      await db("used_cars").insert(jetta);
      await db("used_cars").insert(forester);
    });

    it("should remove car by ID", async () => {
      await UsedCars.remove(jetta.car_id);
      const actual = await db("used_cars")
        .where({ car_id: jetta.car_id })
        .first();
      expect(actual).toBeUndefined();
    });

    it("should return a deleted car", async () => {
      const actual = await UsedCars.remove(jetta.car_id);
      expect(actual).toEqual(jetta);
    });
  });
});
