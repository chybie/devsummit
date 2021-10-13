module.exports = function(timezone) {
  const timezoneRE = /^([+-])(\d\d)(\d\d)$/;
  const result = timezoneRE.exec(timezone);
  if (!result) {
    throw new TypeError(
      `Invalid timezone. Must be in the format [+-]HHMM. Found: ${timezone}`,
    );
  }
  const hours = Number(result[2]);
  const minutes = Number(result[3]);
  let offset = (hours * 60 + minutes) * 60 * 1000;
  if (result[1] === '-') offset *= -1;

  return offset;
};
