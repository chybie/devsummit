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
      'Come with your burning questions about Chrome OS: Learn how to deploy PWAs on Google Play Store or how to build great web experiences with Linux on Chrome OS.',
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
    start: '2020/11/11 09:00',
    end: '2020/11/11 12:00',
    region: 'amer/emea',
    timezone: '-0700',
    week: 1,
  },
  {
    start: '2020/11/12 09:00',
    end: '2020/11/12 12:00',
    region: 'amer/emea',
    timezone: '-0700',
    week: 1,
  },
  {
    start: '2020/11/18 17:30',
    end: '2020/11/18 20:30',
    region: 'apac/emea',
    timezone: '+0530',
    week: 2,
  },
  {
    start: '2020/11/19 08:30',
    end: '2020/11/19 11:30',
    region: 'apac',
    timezone: '+0530',
    week: 2,
  },
];

function generateSessions() {
  let payload = [];

  datesRegions.forEach((dr, drIndex) => {
    sessions.forEach((s, sessionIndex) => {
      payload.push({
        title: s.title,
        description: s.description,
        start: dr.start,
        end: dr.end,
        region: dr.region,
        timezone: dr.timezone,
        permalink: `events/week-${dr.week}/office-hours/${drIndex + 1}-${
          s.id
        }-${s.title.toLowerCase()}/`,
        week: dr.week,
        type: 'office-hours',
        prettyType: 'Office hours',
      });
    });
  });

  return payload;
}

module.exports = generateSessions();
