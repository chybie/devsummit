const { html } = require('../../../../script/escape-html');
const date = require('date-and-time');

function formatTimezone(offset) {
  if (offset === 0) return '';

  const hours = Math.floor(offset / 1000 / 60 / 60);
  const minutes = (offset / 1000 / 60) % 60;

  return (
    (hours > 0 ? '+' : '') +
    hours +
    (minutes ? ':' + minutes.toString().replace('-', '') : '')
  );
}

function dateToTime(dateObj) {
  return date.format(dateObj, 'HH:mm');
}

module.exports = function createUserFriendlyEventDate(
  start,
  end,
  region,
  utcOffset,
) {
  start = parseInt(start);
  end = parseInt(end);

  const offsetString = `UTC(${formatTimezone(utcOffset)})`;
  const startDate = new Date(start.valueOf() + utcOffset);
  const endDate = new Date(end.valueOf() + utcOffset);
  const formattedStart = date.format(startDate, 'MMMM D');

  const encoded = JSON.stringify({
    start: start,
    end: end,
    region: region,
    offset: utcOffset,
  });

  return html`
    <span event-date data-event="${encoded}">
      ${formattedStart}, ${dateToTime(startDate)} – ${dateToTime(endDate)}
      ${offsetString}
    </span>
  `.toString();
};
