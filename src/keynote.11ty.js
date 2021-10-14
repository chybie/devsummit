const icalGenerator = require('./utils/ical-generator');
const { dateStrToTimestamp } = require('./utils/date-helper.js');

module.exports = class iCal {
  data() {
    return {
      permalink: 'keynote.ics',
    };
  }

  render({ conf, collections }) {
    const location = conf.origin + conf.path;
    const session = collections.keynote[0];
    const name = `${session.data.title} - ${conf.conferenceName}`;

    return icalGenerator(name, [
      {
        name,
        location,
        start: dateStrToTimestamp(session.data.start, conf.utcOffset),
        end: dateStrToTimestamp(session.data.end, conf.utcOffset),
      },
    ]);
  }
};
