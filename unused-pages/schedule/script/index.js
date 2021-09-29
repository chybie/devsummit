import createSchedule from './create-schedule';
//import createWorkshops from './create-workshops';
import * as styles from 'classnames:schedule/style.css';
import { utcOffset as venueOffset, path } from 'confbox-config:';
import {
  onChange,
  get as getTimezoneOption,
  localOffset,
} from '../../_includes/timezone-toggle/script/option';

const sheduleEl = document.querySelector('.' + styles.scheduleBlock);
//const workshopsEl = document.querySelector('.workshops-block');

function render() {
  const offset = getTimezoneOption() === 'venue' ? venueOffset : localOffset;
  sheduleEl.innerHTML = createSchedule(
    self.schedule,
    venueOffset,
    offset,
    styles,
    path,
  );
  //workshopsEl.innerHTML = createWorkshops(self.workshops, offset, styles);
}

onChange(render);

render();
sheduleEl.style.visibility = 'visible';
//workshopsEl.style.visibility = 'visible';
