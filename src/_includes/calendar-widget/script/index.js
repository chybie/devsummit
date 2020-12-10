import createWidget from './create-widget';
import * as styles from 'classnames:_includes/calendar-widget/style.css';
import { utcOffset as venueOffset } from 'confbox-config:';
import {
  onChange,
  get as getTimezoneOption,
  localOffset,
} from '../../timezone-toggle/script/option';

function render(el) {
  const timestamp = Number(el.getAttribute('data-timestamp'));
  const offset = getTimezoneOption() === 'venue' ? venueOffset : localOffset;
  el.innerHTML = createWidget(timestamp, offset, styles);
}

export function enhance(el) {
  el.style.visibility = 'visible';
  render(el);

  onChange(() => render(el));
}
