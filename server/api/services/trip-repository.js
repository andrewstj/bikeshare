import l from '../../common/logger';
import tripDao from '../infrastructure/trip-dao';

const getAgeSummaryForTrips = (trips) => {
  const currentYear = new Date().getFullYear();
  const unknownValue = -1;
  const ranges = {
    '0-20': { min: 0, max: 20, quantity: 0 },
    '21-30': { min: 21, max: 30, quantity: 0 },
    '31-40': { min: 31, max: 40, quantity: 0 },
    '41-50': { min: 41, max: 50, quantity: 0 },
    '51+': { min: 51, max: Infinity, quantity: 0 },
    unknown: { min: unknownValue, max: unknownValue, quantity: 0 }
  };
  const rangeArray = Object.values(ranges);
  trips.forEach((trip) => {
    const age = trip.userBirthYear
      ? currentYear - trip.userBirthYear
      : unknownValue;
    rangeArray.find((range) => range.min <= age && age <= range.max).quantity++;
  });
  const ageSummary = Object.keys(ranges).map((key) => {
    return { [key]: ranges[key].quantity };
  });
  return ageSummary;
};

class TripRepository {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return tripDao.getAllTrips();
  }

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
