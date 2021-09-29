const { html, safe } = require('../../../script/escape-html');

module.exports = function createCarousel(id, content, classNameMap) {
  return html`
    <div id="${id}" class="${id}">
      <div class="${classNameMap.carousel_track}">
        ${safe(content)}
      </div>
    </div>
  `.toString();
  // Nunjucks has bugs with String objects, so we to toString to get a primitive.
};
