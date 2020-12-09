import {
  get as getOption,
  set as setOption,
  onChange,
  localOffset,
} from './option';
import { utcOffset as venueOffset } from 'confbox-config:';
import { staticLabel } from 'classnames:_includes/toggle.css';

function formatTimezone(offset) {
  if (offset === 0) return '';

  const hours = Math.floor(offset / 1000 / 60 / 60);
  const minutes = (offset / 1000 / 60) % 60;

  return (hours > 0 ? '+' : '') + hours + (minutes ? ':' + minutes : '');
}

export function enhance(form) {
  form.style.visibility = 'visible';

  if (venueOffset === localOffset) {
    form.innerHTML = `<span class="${staticLabel}">UTC${formatTimezone(
      venueOffset,
    )}</span>`;
    return;
  }

  const [venue, local] = form.querySelectorAll('[name=timezone]');
  const [venueZone, localZone] = form.querySelectorAll('.js-zone');

  venueZone.textContent = formatTimezone(venueOffset);
  localZone.textContent = formatTimezone(localOffset);

  form.addEventListener('change', () => {
    setOption(venue.checked ? 'venue' : 'local');
  });

  function setForm() {
    const timezone = getOption();
    const toCheck = timezone === 'venue' ? venue : local;
    toCheck.checked = true;
  }

  onChange(setForm);
  setForm();
}
