const { html } = require('../../../../script/escape-html');
const {
  timestampToSummitDay,
} = require('../../../../utils/timestamp-to-summit-day');
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

function dateToTime(timestamp, utcOffset) {
  const offsetTime = new Date(timestamp.valueOf() + utcOffset);

  return date.format(offsetTime, 'HH:mm');
}

module.exports = function createUserFriendlyEventDate(
  start,
  end,
  region,
  utcOffset,
) {
  start = parseInt(start);
  end = parseInt(end);

  const day = timestampToSummitDay(start).toString();
  const offsetString = `UTC(${formatTimezone(utcOffset)})`;
  const encoded = JSON.stringify({
    start: start,
    end: end,
    region: region,
    offset: utcOffset,
  });

  return html`
    <span event-date data-event="${encoded}">
      DAY ${day}, ${dateToTime(start, utcOffset)} –
      ${dateToTime(end, utcOffset)} ${offsetString}
    </span>
  `.toString();
};
