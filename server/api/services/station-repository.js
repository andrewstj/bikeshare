import l from '../../common/logger';
import stationDao from '../infrastructure/station-dao';

class StationRepository {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return stationDao.getAllStations();
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return stationDao.getStationById(id);
  }
}

export default new StationRepository();
