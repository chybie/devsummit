const origin = 'https://developer.chrome.com';
const path = '/devsummit/';
const confRoot = origin + path;

module.exports = {
  /**
   * Origin of the conference, for creating absolute URLs.
   */
  origin,
  /**
   * Path of the site. / if it's top-level.
   */
  path,
  /**
   * Name of the conference.
   */
  conferenceName: 'Chrome Dev Summit 2021',
  teaser:
    "Join the Chrome team for our two-day summit to learn about the latest techniques for building for the modern Web, get an early insight into what we're working on, and to share your thoughts on how we can move the platform forward, together.",
  /** Link for registration */
  registerLink:
    'https://events.withgoogle.com/chrome-dev-summit-2020/registrations/new/details/',
  /** Link for updates */
  updatesLink: 'https://web.dev/newsletter/',
  /** Link for requesting invite */
  requestInviteLink:
    'https://events.withgoogle.com/chrome-dev-summit-2021/registrations/new',
  /**
   * Data of the conference venue.
   */
  venue: {},
  /**
   * Conference Twitter account
   */
  twitter: '@ChromiumDev',
  /**
   * Timezone of the conference, in the form [+-]HHMM.
   * Examples: -0700, +0100, +0530
   */
  timezone: '-0700',
  /**
   * Start of conference in the above timezone, in the format: YYYY/MM/DD HH:mm.
   */
  start: '2021/11/03 08:30',
  /**
   * Start of conference in the above timezone, in the format: YYYY/MM/DD HH:mm.
   */
  end: '2021/11/03 11:30',
  /**
   * Additional schedule items. These are merged with the content in /sessions/.
   */
  extraSchedule: [
    /*
    // breaks
    ...[
      // day, start time, end time
      ['09', '10:25', '10:30'],
      ['09', '11:10', '11:15'],
      ['09', '11:35', '11:40'],
      ['10', '10:11', '10:16'],
      ['10', '10:58', '11:04'],
      ['10', '11:22', '11:27'],
    ].map(([day, startTime, endTime]) => ({
      title: 'Interlude',
      start: `2020/12/${day} ${startTime}`,
      end: `2020/12/${day} ${endTime}`,
      icon: '/schedule/assets/coffee.svg',
      livestreamed: true,
    })),
    {
      title: 'Day 1 complete!',
      start: '2020/12/09 13:30',
      end: '2020/12/09 13:31',
    },
    {
      title: `It's over 😢`,
      start: '2020/12/10 13:00',
      end: '2020/12/10 13:01',
    },
    */
  ],
};
