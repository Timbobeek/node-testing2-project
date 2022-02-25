const router = require("express").Router();
const middleware = require("./middleware");
const UsedCars = require("./model");

router.post("/", middleware.validateCarData, (req, res, next) => {
  UsedCars.add(req.carData)
    .then((car) => res.status(201).json(car))
    .catch(next);
});

router.get("/", (req, res, next) => {
  UsedCars.getAll()
    .then((cars) => res.status(200).json(cars ? cars : []))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  UsedCars.get(req.params.id)
    .then((car) =>
      car
        ? res.status(200).json(car)
        : res
            .status(404)
            .json({ message: `car with ID ${req.params.id} was not found` })
    )
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  UsedCars.remove(req.params.id)
    .then((car) =>
      car
        ? res.status(200).json(car)
        : res
            .status(404)
            .json({ message: `car with ID ${req.params.id} was not found` })
    )
    .catch(next);
});

module.exports = router;
