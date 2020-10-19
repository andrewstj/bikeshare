import l from '../../common/logger';
import tripDao from '../infrastructure/trip-dao';
import { getAgeSummaryForTrips } from './get-age-summary-for-trips';

class TripRepository {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return tripDao.getAllTrips();
  }

  /**
   *
   * @param {[number]} endStationIds array of ids of the end station
   * @returns {Promise} Promise object represents a map of {endStationId: {tripsAggregatedByAgeGroup}}
   */
  async getTripsForEndStationsAggregatedByAgeGroups(endStationIds) {
    l.info(
      `${this.constructor.name}.getTripsForEndStationsAggregatedByAgeGroups(${endStationIds})`
    );
    const tripsByEndStationId = await tripDao.getTripsAggregatedByEndStationIds(
      endStationIds
    );
    const ageAggregatedTripsForEndStations = {};
    endStationIds.forEach((id) => {
      const trips = tripsByEndStationId[id];
      ageAggregatedTripsForEndStations[id] = trips
        ? getAgeSummaryForTrips(trips)
        : null;
    });
    return ageAggregatedTripsForEndStations;
  }

  /**
   * @param  {[number]} endStationIds array of ids of the end station
   * @param  {number} quantity=20 number of stations to retrieve per station.
   * @returns {Promise} Promise object represents a map of {endStationId: [...latestTrips]}
   */
  async getLatestTripsByEndStations(endStationIds, quantity = 20) {
    l.info(
      `${this.constructor.name}.getLatestTripsByEndStations([${endStationIds}], ${quantity})`
    );
    const tripsByEndStationId = await tripDao.getTripsAggregatedByEndStationIds(
      endStationIds
    );
    const latestTripsByEndStation = {};
    const sortByEndTimeDescending = (a, b) =>
      Date.parse(b.endTime) - Date.parse(a.endTime);
    endStationIds.forEach((id) => {
      const sortedTrips = (tripsByEndStationId[id] || [])
        .slice()
        .sort(sortByEndTimeDescending);
      latestTripsByEndStation[id] = sortedTrips.slice(0, quantity);
    });
    return latestTripsByEndStation;
  }
}

export default new TripRepository();
