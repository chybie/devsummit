const date = require('date-and-time');

const sessionDuration = 30;

const numberToWordMap = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
};

const sessions = [
  {
    id: 1,
    title: 'Accessibility',
    description: 'Bring any questions related to Lit and Polymer.',
  },
  {
    id: 2,
    title: 'Angular',
    description:
      'Bring your questions about development of modern web applications.',
  },
  {
    id: 3,
    title: 'Chrome OS',
    description:
      'Come with your burning questions about Chrome OS. Learn how to deploy PWAs on Play Store on Chromebooks, how to create web experiences on Chrome OS as a developer environment and more.',
  },
  {
    id: 4,
    title: 'CWV',
    description:
      'One-on-one discussions around best practices for measuring and monitoring performance in the field and lab as well as exploring opportunities for quick performance wins.\n',
  },
  {
    id: 5,
    title: 'Design',
    description: 'Get your questions answered about CSS today and tomorrow.',
  },
  {
    id: 6,
    title: 'DevTools',
    description: "Any question on Chrome DevTools? Let's chat.",
  },
  {
    id: 7,
    title: 'Extensions',
    description:
      'Meet with members of the Extensions Platform and Chrome Web Store teams to talk about all of your burning extensions-related questions. ',
  },
  {
    id: 8,
    title: 'JavaScript',
    description:
      'One-on-one discussions around JavaScript/TypeScript and general frontend engineering.',
  },
  {
    id: 9,
    title: 'Lit',
    description: 'Bring any questions related to Lit and Polymer.',
  },
  {
    id: 10,
    title: 'Privacy',
    description:
      'Ask us anything related to WebOTP to empower your phone number verification implementation.',
  },
  {
    id: 11,
    title: 'PWA',
    description:
      'Questions about Progressive Web Apps (PWAs), from Web App Manifest to Service Workers to new APIs.',
  },
  {
    id: 12,
    title: 'WASM',
    description:
      'If you are working on application that uses or plans to use WebAssembly or Emscripten — this is your chance to ask any burning questions. Please note: these office hours are likely not the best place to ask questions about Tensorflow.js or general getting started guides.',
  },
];

const datesRegions = [
  {
    date: '2020/11/11',
    region: 'amer/emea',
    timezone: '-0700',
    week: 1,
    schedule: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  },
  {
    date: '2020/11/12',
    region: 'amer/emea',
    timezone: '-0700',
    week: 1,
    schedule: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  },
  {
    date: '2020/11/18',
    region: 'apac/emea',
    timezone: '+5300',
    week: 2,
    schedule: ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00'],
  },
  {
    date: '2020/11/19',
    region: 'apac',
    timezone: '+5300',
    week: 2,
    schedule: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
  },
];

function generateSessions() {
  let payload = [];

  datesRegions.forEach((dr, drIndex) => {
    dr.schedule.forEach((time, timeIndex) => {
      const dateTimeStr = `${dr.date} ${time}`;

      sessions.forEach(s => {
        let endDate = date.addMinutes(new Date(dateTimeStr), sessionDuration);

        payload.push({
          title: `Session ${numberToWordMap[timeIndex + 1]}: ${s.title}`,
          description: s.description,
          start: dateTimeStr,
          end: date.format(endDate, 'YYYY/MM/DD HH:mm'),
          region: dr.region,
          timezone: dr.timezone,
          permalink: `events/week-${dr.week}/office-hours/${drIndex +
            1}-${timeIndex + 1}-${s.id}-${s.title.toLowerCase()}/`,
          week: dr.week,
          type: 'office-hours',
          prettyType: 'Office hours',
        });
      });
    });
  });

  console.log(payload);
  return payload;
}

module.exports = generateSessions();
