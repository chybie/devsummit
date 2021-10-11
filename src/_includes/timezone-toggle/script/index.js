import {
  get as getOption,
  set as setOption,
  onChange,
  localOffset,
} from './option';
import { utcOffset as venueOffset } from 'confbox-config:';

export function enhance(form) {
  form.style.visibility = 'visible';

  if (venueOffset === localOffset) {
    return;
  }

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
