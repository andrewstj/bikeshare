import l from '../../common/logger';
import tripDao from '../infrastructure/trip-dao';

class TripRepository {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return tripDao.getAllTrips();
  }

  getTripsForEndStationsAggregatedByAgeGroups(endStationIds) {
    l.info(
      `${this.constructor.name}.getTripsForEndStationsAggregatedByAgeGroups(${endStationIds})`
    );
    const tripsByEndStationId = tripDao.getTripsAggregatedByEndStationIds(endStationIds);
    return [tripsByEndStationId[0]]; // TODO: Finish this logic.
  }

  async getLatestTripsByEndStations(endStationIds, quantity=20) {
    l.info(
      `${this.constructor.name}.getLatestTripsByEndStations([${endStationIds}], ${quantity})`
    );
    const tripsByEndStationId = await tripDao.getTripsAggregatedByEndStationIds(
      endStationIds
    );
    const latestTripsByEndStation = {};
    const sortByEndTimeDescending = (a, b) => Date.parse(b.endTime) - Date.parse(a.endTime);
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
