/**
 *
 * @param {[Object]} trips array of trips to convert to a summarized object by age
 * @returns {Object} age summary object, which has the key as the age range, and value is the quantity:
 * {
 *  '0-20': 0,
 *  '21-30': ...
 * }
 */
export const getAgeSummaryForTrips = (trips) => {
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
