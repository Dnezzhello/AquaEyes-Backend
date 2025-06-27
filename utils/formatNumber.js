/**
 * Rounds a number to two decimal places
 * @param {number} value - The value to round
 * @returns {number} - The rounded value
 */
const roundToTwoDecimals = (value) => {
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    return value;
  }
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export default roundToTwoDecimals;
