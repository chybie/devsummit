const { monthsShort } = require('../../script/date');
const { html } = require('../../script/escape-html');
const { formatTime, groupIntoDays } = require('./utils');

module.exports = function createWorkshopHtml(items, utcOffset, classNameMap) {
  const days = groupIntoDays(items, utcOffset);

  return html`
    <section>
      ${days.map(
        ({ date, month, items }) => html`
          <h1 class="${classNameMap.workshopDate}">
            ${monthsShort[month]} ${date}
          </h1>
          ${items.map(item => {
            const sessionStart = new Date(item.start + utcOffset);
            const sessionEnd = new Date(item.end + utcOffset);

            return html`
              <div class="${classNameMap.workshopItem}">
                <img
                  class="${classNameMap.workshopAvatar}"
                  src="${item.speakers[0].avatar}"
                  alt="${item.speakers[0].avatarAlt || ''}"
                  decoding="async"
                  loading="lazy"
                />
                <div class="${classNameMap.workshopDetails}">
                  <div class="${classNameMap.workshopTitle}">${item.title}</div>
                  <div class="${classNameMap.workshopSpeaker}">
                    <a href="${item.speakers[0].link}"
                      >${item.speakers[0].name}</a
                    >
                  </div>
                </div>
                <div class="${classNameMap.workshopTimeCell}">
                  <div class="${classNameMap.workshopTime}">
                    ${formatTime(sessionStart, classNameMap)} -
                    ${formatTime(sessionEnd, classNameMap)}
                  </div>
                </div>
              </div>
            `;
          })}
        `,
      )}
    </section>
  `.toString();
  // Nunjucks has bugs with String objects, so we to toString to get a primitive.
};
