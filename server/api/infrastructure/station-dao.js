import fetch from 'node-fetch';
import l from '../../common/logger';

class StationDao {
  constructor() {
    this._stationById = {};
  }

  async initialize() {
    const stationUrl =
      'https://gbfs.divvybikes.com/gbfs/en/station_information.json';
    const fetchStations = async (stationUrl) => {
      return fetch(stationUrl)
        .then((response) => response.json())
        .then((responseData) => responseData.data.stations);
    };

    return fetchStations(stationUrl).then((stations) => {
      l.info('Found ' + stations.length + ' stations.');
      stations.forEach((station) => {
        const id = parseInt(station['station_id']);
        this._stationById[id] = {id: id, ...station};
      });
    });
  }

  getAllStations() {
    return Promise.resolve(Object.values(this._stationById));
  }

  getStationById(id) {
    return Promise.resolve(this._stationById[id]);
  }
}

export default new StationDao();
