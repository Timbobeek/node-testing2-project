const router = require("express").Router();
const middleware = require("./middleware");
const UsedCars = require("./model");

router.post("/", middleware.validateCarData, (req, res, next) => {
  UsedCars.add(req.carData)
    .then((project) => res.status(201).json(project))
    .catch(next);
});

router.get("/", (req, res, next) => {
  UsedCars.getAll()
    .then((projects) => res.status(200).json(projects ? projects : []))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  UsedCars.get(req.carId)
    .then((projects) => res.status(200).json(projects ? projects : []))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  UsedCars.getAll()
    .then((projects) => res.status(200).json(projects ? projects : []))
    .catch(next);
});

module.exports = router;
