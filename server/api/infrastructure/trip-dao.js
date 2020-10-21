const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');
import * as path from 'path';
import l from '../../common/logger';
import * as CSV from 'csv-string';

class TripDao {
  constructor() {
    this._tripsByEndStationId = {};
    this.addTrip = (trip) => {
      if (!this._tripsByEndStationId[trip.endStationId]) {
        this._tripsByEndStationId[trip.endStationId] = [];
      }
      this._tripsByEndStationId[trip.endStationId].push(trip);
    };
  }

  /**
   * Initializes the trip DAO by reading data from a file into memory.
   */
  async initialize() {
    const cacheRecordsFromFile = async (fileName) => {
      if (!fs.existsSync(fileName)) {
        throw new Error('File not found: ' + fileName);
      }
      const readInterface = readline.createInterface({
        input: fs.createReadStream(fileName),
        console: false
      });
      let isFirstLine = true;
      for await (const line of readInterface) {
        if (isFirstLine) {
          isFirstLine = false;
        } else {
          const trip = extractTripFromLine(line);
          this.addTrip(trip);
        }
      }
    };

    const extractTripFromLine = (line) => {
      const record = CSV.parse(line)[0];
      const trip = {
        id: parseInt(record[0]),
        startTime: record[1],
        endTime: record[2],
        bikeId: parseInt(record[3]),
        durationInSeconds: record[4],
        startStationId: parseInt(record[5]),
        startStationName: record[6],
        endStationId: parseInt(record[7]),
        endStationName: record[8],
        userType: record[9],
        userGender: record[10],
        userBirthYear: parseInt(record[11])
      };
      return trip;
    };

    const resourcesDir = path.normalize(`${__dirname}/../../common/resources`);
    const tripFilename = path.join(resourcesDir, 'Divvy_trips_2019_Q2');
    l.debug('Caching trips from file: ' + tripFilename);
    return cacheRecordsFromFile(tripFilename);
  }

  getAllTrips() {
    return Promise.resolve(Object.values(this._tripsByEndStationId));
  }

  /**
   * 
   * @param {[number]} ids of the end stations
   * @returns {Promise} Object represents a map of {endStationId: [...trips...]} 
   */
  getTripsAggregatedByEndStationIds(ids) {
    return Promise.resolve(_.pick(this._tripsByEndStationId, ids));
  }
}

export default new TripDao();
