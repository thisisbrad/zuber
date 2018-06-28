const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ howdy: 'partner' });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },
  create(req, res, next) {
    // console.log('body', req.body);
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },
  update(req, res, next) {
    // console.log('body', req.body);
    const driverProps = req.body;
    Driver.findByIdAndUpdate({ _id: req.params.id }, driverProps)
      .then(() => Driver.findById({ _id: req.params.id }))
      .then(driver => res.send(driver))
      .catch(next);
  },
  delete(req, res, next) {
    // console.log('body', req.body);
    // const driverProps = req.body;
    Driver.findByIdAndRemove({ _id: req.params.id })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
