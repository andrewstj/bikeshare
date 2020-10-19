import tripRepository from '../../business/trip-repository';

export class Controller {
  getLatestTripsByEndStations(req, res) {
    const defaultQuantity = 20;
    const endStationIds = req.query.ids;
    const quantity = req.query.quantity || defaultQuantity;
    tripRepository
      .getLatestTripsByEndStations(endStationIds, quantity)
      .then((r) => {
        if (r) {
          res.json(r);
        } else {
          res.status(404).end();
        }
      });
  }

  aggregateAgeByEndStations(req, res) {
    const endStationIds = req.query.ids;
    tripRepository
      .getTripsForEndStationsAggregatedByAgeGroups(endStationIds)
      .then((r) => {
        if (r) {
          res.json(r);
        } else {
          res.status(404).end();
        }
      });
  }
}
export default new Controller();
