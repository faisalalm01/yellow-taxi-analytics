const routes = require('express').Router();
const tripControllers = require('../controllers/tripControllers');

routes.get('/trip', tripControllers.getTrip);
routes.get('/trip/:id', tripControllers.getDetailTrip);

module.exports = routes;

