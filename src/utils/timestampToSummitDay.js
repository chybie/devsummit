const map = {
  8: 1,
  9: 2,
  10: 3,
  11: 4,
  12: 5,

  15: 6,
  16: 7,
  17: 8,
  18: 9,
  19: 10,
};

function timestampToSummitDay(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();

  if (typeof map[day] === 'undefined')
    throw new Error(`${date} is not a known day`);
  return map[day];
}

module.exports = { timestampToSummitDay };
