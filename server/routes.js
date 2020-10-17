import examplesRouter from './api/controllers/examples/router';
import stationsRouter from './api/controllers/stations/router';

export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/stations', stationsRouter);
}
