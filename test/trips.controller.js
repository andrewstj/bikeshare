import chai from 'chai';
import request from 'supertest';
import tripDao from '../server/api/infrastructure/trip-dao';
import testServer from '../server/test-server';

const expect = chai.expect;

describe('trip-search', () => {
  let trips;
  let expectedTripsByAge;
  let expectedLatestTrips;
  describe('with trips', () => {
    before(() => {
      const currentYear = new Date().getFullYear();
      trips = [
        {
          endTime: '2019-04-30 21:14:25',
          endStationId: 1,
          endStationName: 'One',
          userBirthYear: currentYear - 25
        },
        {
          endTime: '2019-05-30 21:14:25',
          endStationId: 1,
          endStationName: 'One',
          userBirthYear: currentYear - 15
        },
        {
          endTime: '2019-04-30 21:14:25',
          endStationId: 2,
          endStationName: 'Two',
          userBirthYear: currentYear - 30
        },
        {
          endTime: '2019-05-30 21:14:25',
          endStationId: 2,
          endStationName: 'Two',
          userBirthYear: currentYear - 29
        },
        {
          endTime: '2019-06-30 21:14:25',
          endStationId: 2,
          endStationName: 'Two',
          userBirthYear: null
        }
      ];
      trips.forEach((trip) => tripDao.addTrip(trip));
      expectedTripsByAge = {
        1: [
          {
            '0-20': 1
          },
          {
            '21-30': 1
          },
          {
            '31-40': 0
          },
          {
            '41-50': 0
          },
          {
            '51+': 0
          },
          {
            unknown: 0
          }
        ],
        2: [
          {
            '0-20': 0
          },
          {
            '21-30': 2
          },
          {
            '31-40': 0
          },
          {
            '41-50': 0
          },
          {
            '51+': 0
          },
          {
            unknown: 1
          }
        ]
      };
      expectedLatestTrips = {
        1: [
          {
            endTime: '2019-05-30 21:14:25',
            endStationId: 1,
            endStationName: 'One',
            userBirthYear: currentYear - 15
          },
          {
            endTime: '2019-04-30 21:14:25',
            endStationId: 1,
            endStationName: 'One',
            userBirthYear: currentYear - 25
          }
        ],
        2: [
          {
            endTime: '2019-06-30 21:14:25',
            endStationId: 2,
            endStationName: 'Two',
            userBirthYear: null
          },
          {
            endTime: '2019-05-30 21:14:25',
            endStationId: 2,
            endStationName: 'Two',
            userBirthYear: currentYear - 29
          }
        ]
      };
    });
    it('should get trips by age', () =>
      request(testServer)
        .get(
          '/api/v1/trip-search/_aggregateAgeByEndStations?ids=1,2&X-API-KEY=abc'
        )
        .expect('Content-Type', /json/)
        .then((r) => {
          expect(r.body).to.deep.equal(expectedTripsByAge);
        }));

    it('should get latest trips', () =>
      request(testServer)
        .get(
          '/api/v1/trip-search/_queryByEndStations?ids=1,2&quantity=2&X-API-KEY=1'
        )
        .expect('Content-Type', /json/)
        .then((r) => {
          expect(r.body).to.deep.equal(expectedLatestTrips);
        }));
  });
});
