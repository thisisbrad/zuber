const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ howdy: 'partner' });
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
  }
};
