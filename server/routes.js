import examplesRouter from './api/controllers/examples/router';
import stationsRouter from './api/controllers/stations/router';
import tripsRouter from './api/controllers/trips/router';

export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/stations', stationsRouter);
  app.use('/api/v1/trip-search', tripsRouter);
}
