/**
 * Calculate the percentage of missed headways as a portion of all affected trips
 * @param {object} trips contains 3 arrays, 1 each for NTstops, SLCstops, normalStops
 * @returns {number} sum of all percentages of total affected trips
 */

const headwayCalc = (trips) => {
  const SLCstops = 8;
  const NTstops = 10;
  const stops = 16;
  const percentages = [];
  let total = 0;

  /**
   * for loop function to iterate over trips arrays. array length of 0 means no trips for that type.
   * pushes to percentages array
   * @param {array} trips an array of trips
   * @param {string} type  type of trip to loop, slc, nt, or normal trips. default of normal trip unless specified
   * @returns nothing
   */
  const tripLoop = (trips, type) => {
    switch (type) {
        case "slc":
            for (let i = 0; i < trips.length; i++) {
                percentages.push(trips[i] / SLCstops);
            }
            break;
        case "nt":
            for (let i = 0; i < trips.length; i++) {
                percentages.push(trips[i] / NTstops);
            }
            break;
        default:
            for (let i = 0; i < trips.length; i++) {
                percentages.push(trips[i] / stops);
            }
            break;
    }
    return;
  };

  trips.NTstops.length > 0 ? tripLoop(trips.NTstops, "nt") : null;
  trips.SLCstops.length > 0 ? tripLoop(trips.SLCstops, "slc") : null;
  trips.normalStops.length > 0 ? tripLoop(normalStops) : null;

  for (let i = 0; i < percentages.length; i++) {
    total += percentages[i];
  }
  return total;
};

headwayCalc(process.argv[2]);
