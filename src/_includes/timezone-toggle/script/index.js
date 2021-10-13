import {
  get as getOption,
  set as setOption,
  onChange,
  localOffset,
} from './option';
import { utcOffset as venueOffset } from 'confbox-config:';

export function enhance(form) {
  // Hide if local time zone matches venue time zone
  if (venueOffset === localOffset) {
    form.style.display = 'none';

    return;
  }

  form.style.visibility = 'visible';

  const [venue, local] = form.querySelectorAll('[name=timezone]');

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
