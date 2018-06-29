const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ howdy: 'partner' });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;
    const point = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };
    console.log('in ctrl', point)
    Driver.aggregate([
        {
            $geoNear: { 
                near: point,
                spherical: true,
                maxDistance: 200000,
                distanceField: 'dist.calculated'
            }
        }])
        .then((drivers) => {
          console.log('DRIVERS', drivers)
            res.send(drivers);
        })
        .catch((error, next)=>{
          console.log('in ctrl', error)
          next()
        });
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
