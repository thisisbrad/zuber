const DriverController = require('../controllers/driver_controller');

module.exports = app => {
  //
  app.get('/api', DriverController.greeting);

  app.post('/api/drivers', DriverController.create);
};
