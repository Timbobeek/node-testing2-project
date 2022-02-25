const request = require("supertest");
const server = require("../api/server.js");

describe("server.js", () => {
  describe("health route", () => {
    it("should return an OK status code from the health route", async () => {
      const response = await request(server).get("/api/health");
      expect(response.status).toEqual(200);
    });
  });
});
