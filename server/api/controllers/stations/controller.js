import stationRepository from '../../services/station-repository';

export class Controller {
  all(req, res) {
    return stationRepository.all().then((r) => res.json(r));
  }

  byId(req, res) {
    stationRepository.byId(req.params.id).then((r) => {
      if (r) {
        res.json(r);
      } else {
        res.status(404).end();
      }
    });
  }
}
export default new Controller();
