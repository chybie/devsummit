import createUserFriendlyEventDate from './create-user-friendly-event-date';
import { utcOffset as venueOffset, path } from 'confbox-config:';
import {
  onChange,
  get as getTimezoneOption,
  localOffset,
} from '../../../timezone-toggle/script/option';

onChange(() => {
  render();
});

function render() {
  const offset = getTimezoneOption() === 'venue' ? venueOffset : localOffset;
  const dates = document.querySelectorAll('[event-date]');

  dates.forEach(e => {
    const event = JSON.parse(e.dataset.event);
    e.innerHTML = createUserFriendlyEventDate(
      event.start,
      event.end,
      event.region,
      offset,
    );
  });
}

render();
