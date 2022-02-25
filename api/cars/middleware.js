const validateCarData = async (req, res, next) => {
  const { make, model, year, mpg, milage, price } = req.body;
  if (!make || !model || !year || !mpg || !milage || !price) {
    next({
      status: 400,
      message: `The following fields are required: make, model, year, mpg, milage, price.`,
    });
  } else {
    req.carData = { make, model, year, mpg, milage, price }
    next();
  }
};

module.exports = {
  validateCarData,
};
