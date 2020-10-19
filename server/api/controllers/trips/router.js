import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/_queryByEndStations', controller.byEndStations)
  .get('/_aggregateAgeByEndStations', controller.aggregateAgeByEndStations);
