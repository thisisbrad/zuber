const DriverController = require('../controllers/driver_controller');

module.exports = app => {
  //
  app.get('/api', DriverController.greeting);

  app.get('/api/drivers', DriverController.index);
  app.post('/api/drivers', DriverController.create);
  app.put('/api/drivers/:id', DriverController.update);
  app.delete('/api/drivers/:id', DriverController.delete);
};
