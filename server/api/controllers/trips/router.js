import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/_queryByEndStations', controller.getLatestTripsByEndStations)
  .get('/_aggregateAgeByEndStations', controller.aggregateAgeByEndStations);
