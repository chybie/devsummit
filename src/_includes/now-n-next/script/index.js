import { html, safe } from '../../../script/escape-html';
import * as styles from 'classnames:_includes/now-n-next/style.css';
import * as speakerStyles from 'classnames:_includes/speakers.css';
import * as utilsStyles from 'classnames:_includes/utils.css';
import { path } from 'confbox-config:';

const upNextEl = document.querySelector('.' + styles.upNext);
const onNowEl = document.querySelector('.' + styles.onNow);
const rootEl = document.querySelector('.' + styles.root);
const livestreamEl = document.querySelector('.' + styles.livestream);
const viewToggleEl = document.querySelector('.' + styles.toggle);
const [detailsRadio, chatRadio] = viewToggleEl.querySelectorAll(
  'input[type=radio]',
);
const chatEl = document.querySelector('.' + styles.chat);
const schedule = self.basicSchedule;

// 5 hours before the first day 2 session.
const day2LivestreamSwitchover = 1607603400000;

const getNow = () =>
  Number(new URL(location).searchParams.get('now')) || Date.now();

class RelativeTime extends HTMLElement {
  static get observedAttributes() {
    return ['time'];
  }

  _update() {
    const time = Number(this.getAttribute('time'));
    if (!time) {
      this.innerHTML = '';
      return;
    }

    const now = getNow();
    const delta = now - time;

    const minDelta = Math.abs(Math.round(delta / (1000 * 60)));
    const displayedMins = minDelta % 60;
    const displayedHours = (minDelta - displayedMins) / 60;

    const renderedTime = html`
      ${displayedHours
        ? html`
            <strong>${displayedHours}</strong>
            hour${displayedHours === 1 ? '' : 's'}
          `
        : ''}
      ${displayedMins
        ? html`
            <strong>${displayedMins}</strong>
            minute${displayedMins === 1 ? '' : 's'}
          `
        : ''}
    `;

    if (delta < 0) {
      if (minDelta === 0) {
        this.innerHTML = 'Starting soon';
        return;
      }

      this.innerHTML = html`
        in ${renderedTime}
      `;
      return;
    }

    if (minDelta === 0) {
      this.innerHTML = 'Just started';
      return;
    }

    this.innerHTML = html`
      started ${renderedTime} ago
    `;
  }

  connectedCallback() {
    this._update();
    this._interval = setInterval(() => this._update(), 1000 * 60);
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }

  attributeChangedCallback() {
    this._update();
  }
}

customElements.define('rel-time', RelativeTime);

function getCurrentScheduleIndex(now) {
  for (const [i, item] of [...schedule.entries()].reverse()) {
    if (now >= item.start) return i;
  }
  return -1;
}

function updateOnNow(item, now) {
  return html`
    ${item.livestreamed
      ? html`
          <div class="${styles.liveNow}">Live now</div>
        `
      : now < item.end
      ? html`
          <div class="${styles.happeningNow}">Happening now</div>
        `
      : ''}
    <h1 class="${styles.nowTitle}">
      ${item.session
        ? html`
            <a href="${path}sessions/${item.fileSlug}/">${item.title}</a>
          `
        : item.nowNextLink
        ? html`
            <a href="${item.nowNextLink}">${item.title}</a>
          `
        : item.title}
    </h1>
    ${item.livestreamed
      ? html`
          <rel-time class="${styles.relTime}" time="${item.start}"></rel-time>
        `
      : ''}
    ${item.nowNextHTML
      ? html`
          <p class="${styles.nowNextDesc}">${safe(item.nowNextHTML)}</p>
        `
      : ''}
    ${item.speakers
      ? html`
          <ul class="${speakerStyles.speakerlist} ${styles.speakerList}">
            ${item.speakers.map(
              speaker => html`
                <li class="${speakerStyles.speaker} ${styles.speaker}">
                  <img
                    src="${speaker.avatar}"
                    class="${speakerStyles.speakerAvatar}"
                    alt=""
                  />
                  <div class="${speakerStyles.speakerCreds}">
                    <div class="${speakerStyles.speakerName}">
                      ${speaker.link
                        ? html`
                            <a
                              href="${speaker.link}"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              ${speaker.name}
                            </a>
                          `
                        : speaker.name}
                    </div>
                    <div class="${speakerStyles.speakerTitle}">
                      ${speaker.title}
                    </div>
                  </div>
                </li>
              `,
            )}
          </ul>
        `
      : ''}
  `;
}

function updateOnNext(item) {
  if (!item) return '';

  return html`
    <div class="${styles.upNextInner}">
      <div class="${styles.nextLabel}">Up Next →</div>
      <h1 class="${styles.nextTitle}">
        ${item.session
          ? html`
              <a href="${path}sessions/${item.fileSlug}/">${item.title}</a>
            `
          : item.title}
      </h1>
      <rel-time class="${styles.relTime}" time="${item.start}"></rel-time>
    </div>
  `;
}

function update() {
  const now = getNow();

  const currentIndex = getCurrentScheduleIndex(now);
  const excuses = [
    'Checking the internet pipes…',
    'Rehearsing the dances…',
    'Herding the speakers…',
    'Last-minute debugging…',
    `Wait, it's today already??`,
    'Learning our lines…',
    'Pacing nervously…',
    'Last-minute slide changes…',
    'Warming up the YouTubes',
    'Memorising the acronyms…',
    `Trying to find the 'on' button…`,
    `Arguing over who was supposed to write the keynote…`,
    `Hyperventilating…`,
    `Backstage pep talk…`,
    `Trying to find a slide clicker…`,
    `Final health and safety checks…`,
    `Finishing the risk assessment…`,
    `Shedding the bikes…`,
    `Sending 'intent to broadcast'…`,
    `Enabling the flags…`,
    `Waiting for the build to finish…`,
    `Turning it off and on again…`,
  ];
  const nowItem =
    schedule[currentIndex] &&
    !(
      now > day2LivestreamSwitchover &&
      schedule[currentIndex].start < day2LivestreamSwitchover
    )
      ? schedule[currentIndex]
      : {
          title: excuses[Math.floor(Math.random() * excuses.length)],
          end: Infinity,
        };
  const nextItem = schedule
    .slice(currentIndex + 1)
    .find(item => item.livestreamed || item.event);

  onNowEl.innerHTML = updateOnNow(nowItem, now);
  upNextEl.innerHTML = updateOnNext(nextItem);

  if (!schedule[currentIndex + 1]) {
    viewToggleEl.style.display = 'none';
    return;
  }
  setTimeout(() => update(), schedule[currentIndex + 1].start - now);
}

(() => {
  if (!self.showNowNext) return;
  const youtubeId = 'NkIi7h8NnS4';

  viewToggleEl.style.visibility = 'visible';

  viewToggleEl.addEventListener('change', () => {
    chatEl.style.display = detailsRadio.checked ? 'none' : '';
    onNowEl.style.display = detailsRadio.checked ? '' : 'none';
  });

  livestreamEl.innerHTML = html`
    <iframe
      class="${utilsStyles.mediaFill}"
      src="https://www.youtube.com/embed/${youtubeId}"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  chatEl.innerHTML = html`
    <iframe
      title="web.dev YouTube live chat"
      class="${styles.chatIframe}"
      src="https://www.youtube.com/live_chat?v=${youtubeId}&amp;embed_domain=${location.hostname}"
      frameborder="0"
    ></iframe>
  `;

  update();
  rootEl.style.display = '';
  bodyBlocker.remove();
})();
