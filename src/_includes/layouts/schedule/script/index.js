import createUserFriendlyEventDate from './create-user-friendly-event-date';
import {
  onChange,
  get as getTimezoneOption,
  localOffset,
} from '../../../timezone-toggle/script/option';

onChange(() => {
  render();
});

function render() {
  const dates = document.querySelectorAll('[event-date]');

  dates.forEach(e => {
    const event = JSON.parse(e.dataset.event);
    const offset = getTimezoneOption() === 'venue' ? event.offset : localOffset;

    e.innerHTML = createUserFriendlyEventDate(
      event.start,
      event.end,
      event.region,
      offset,
    );
  });
}

render();
