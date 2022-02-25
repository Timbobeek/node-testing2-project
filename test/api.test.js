const db = require("../data/db-config.js");
const request = require("supertest");
const server = require("../api/server.js");

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

afterAll(async () => {
  await db.destroy();
});

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db("used_cars").insert(jetta);
  await db("used_cars").insert(forester);
});

describe("server.js", () => {
  describe("api/health", () => {
    it("should return an OK status code from the health route", async () => {
      const response = await request(server).get("/api/health");
      expect(response.status).toEqual(200);
    });
  });

  describe("POST api/cars", () => {
    const newCar = {
      make: "Volkswagen",
      model: "Jetta",
      year: 1998,
      mpg: 30,
      milage: 200,
      price: 4000,
    };

    it("should add new car", async () => {
      const response = await request(server).post("/api/cars").send(newCar);
      expect(response.status).toEqual(201);
      const actual = await db("used_cars")
        .where({ car_id: response.body.car_id })
        .first();
      expect({...actual, 'car_id': 'removed'}).toEqual({...newCar, 'car_id': 'removed'});
    });

    it("should return newly created car", async () => {
      const response = await request(server).post("/api/cars").send(newCar);
      expect(response.status).toEqual(201);
      expect({...response.body, 'car_id': 'removed'}).toEqual({...newCar, 'car_id': 'removed'});
    });
  });

  describe("GET api/cars", () => {
    it("should return all existing cars", async () => {
      const response = await request(server).get("/api/cars");
      expect(response.status).toEqual(200);
      expect(response.body).toContainEqual(jetta);
      expect(response.body).toContainEqual(forester);
    });
  });

  describe("GET api/cars/:id", () => {
    it("should return car specified by ID", async () => {
      const response = await request(server).get(`/api/cars/${jetta.car_id}`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(jetta);
    });
  });

  describe("DELETE api/cars/:id", () => {
    it("should delete car specified by ID", async () => {
      const response = await request(server).delete(
        `/api/cars/${jetta.car_id}`
      );
      expect(response.status).toEqual(200);
      const actual = await db("used_cars")
        .where({ car_id: jetta.car_id })
        .first();
      expect(actual).toBeUndefined();
    });

    it("should return car specified by ID", async () => {
      const response = await request(server).delete(
        `/api/cars/${jetta.car_id}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(jetta);
    });
  });
});
