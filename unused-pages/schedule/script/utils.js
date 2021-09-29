const { html } = require('../../script/escape-html');

/**
 * @param {Date} date
 */
module.exports.formatTime = function formatTime(date, classNameMap) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return html`
    <time>
      ${hours % 12 || 12}${minutes
        ? ':' + minutes.toString().padStart(2, '0')
        : ''}
      <span class="${classNameMap.amPm}">${hours < 12 ? 'am' : 'pm'}</span>
    </time>
  `;
};

module.exports.groupIntoDays = function groupIntoDays(items, utcOffset) {
  let currentMonth = '';
  let currentDate = 0;

  const days = [];
  let day;

  for (const item of items) {
    const itemDate = new Date(item.start + utcOffset);
    const date = itemDate.getUTCDate();
    const month = itemDate.getUTCMonth();

    if (date !== currentDate || month !== currentMonth) {
      currentDate = date;
      currentMonth = month;
      day = { date, month, items: [] };
      days.push(day);
    }

    day.items.push(item);
  }

  return days;
};
