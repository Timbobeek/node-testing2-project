const express = require("express");
const carsRouter = require("./cars/router");
const server = express();

server.use(express.json());
server.use("/api/cars", carsRouter);

server.use("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
