const officeHours = require('./officeHours');

function createGroup(from) {
  return {
    start: from.start,
    end: from.end,
    timezone: from.timezone,
    region: from.region,
    session: from.session,
    sessions: [],
  };
}

function groupByDay() {
  const grouped = [];

  officeHours.forEach(session => {
    let group = grouped.find(g => g.start === session.start);

    if (!group) {
      group = createGroup(session);
      grouped.push(group);
    }

    group.sessions.push(session);
  });

  return grouped;
}

module.exports = groupByDay();
