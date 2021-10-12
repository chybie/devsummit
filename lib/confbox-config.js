const date = require('date-and-time');
const config = require('../confbox.config');
const getUtcOffset = require('../src/utils/utc-offset');

const {
  timezone: configTimezone,
  start: configStart,
  end: configEnd,
  ...configExtra
} = config;

// Origin for webcal URLs:
const webcalOrigin = config.origin.replace(/^https?/, 'webcal');

// Process configTimezone
const utcOffset = getUtcOffset(configTimezone);

// Convert configStart and configEnd to timestamps
const [start, end] = [configStart, configEnd].map(dateStr => {
  const result = date.parse(dateStr, 'YYYY/MM/DD HH:mm', true);
  if (isNaN(result)) {
    throw new TypeError(
      `Invalid date in confbox.config.js. Must be in the format YYYY/MM/DD HH:mm'. Found: ${dateStr}`,
    );
  }
  return result.valueOf() - utcOffset;
});

module.exports = {
  utcOffset,
  start,
  end,
  webcalOrigin,
  ...configExtra,
};
