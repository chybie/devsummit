const { html, safe } = require('../../../script/escape-html');

module.exports = function createCarouselSlideHtml(content, classNameMap) {
  return html`
    <div class="${classNameMap.carousel_slide}">${safe(content)}</div>
  `.toString();
  // Nunjucks has bugs with String objects, so we to toString to get a primitive.
};
