const { html, safe } = require('../../../script/escape-html');

module.exports = function createCard(
  title,
  tag,
  link,
  target,
  content,
  classNameMap,
) {
  return html`
    <article class="${classNameMap.card}">
      <a href="${link}" target="${target}">
        <div>
          <span class="${classNameMap.tag}">${tag}</span>

          <h2 class="${classNameMap.title}">${title}</h2>
        </div>

        ${safe(content)}
      </a>
    </article>
  `.toString();
  // Nunjucks has bugs with String objects, so we to toString to get a primitive.
};
