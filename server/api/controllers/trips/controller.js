import tripRepository from '../../services/trip-repository';

export class Controller {
  all(req, res) {
    return tripRepository.all().then((r) => res.json(r));
  }

  byEndStations(req, res) {
    const defaultQuantity = 20;
    const endStationIds = req.query.ids;
    const quantity = req.query.quantity || defaultQuantity;
    tripRepository.getLatestTripsByEndStations(endStationIds, quantity).then((r) => {
      if (r) {
        res.json(r);
      } else {
        res.status(404).end();
      }
    });
  }
}
export default new Controller();
