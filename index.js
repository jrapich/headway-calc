/**
 * Calculate the percentage of missed headways as a portion of all affected trips
 * @param {object} trips contains 3 arrays, 1 each for NTstops, SLCstops, normalStops
 * @returns {number} sum of all percentages of total affected trips
 */

//for now, pass arg to node a single string containing the data in json format. example:
// "{"NTstops":"[1,2,3]","SLCstops":"[1,2,3]","normalStops":"[1,2,3]"}"
const headwayCalc = async (trips) => {
  const json = await new Function("return " + trips)();
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

  json.NTstops.length > 0 ? tripLoop(json.NTstops, "nt") : null;
  json.SLCstops.length > 0 ? tripLoop(json.SLCstops, "slc") : null;
  json.normalStops.length > 0 ? tripLoop(json.normalStops) : null;

  for (let i = 0; i < percentages.length; i++) {
    total += percentages[i];
  }
  console.log("sum of missed headways:", total);
  return total;
};

headwayCalc(process.argv[2]);
