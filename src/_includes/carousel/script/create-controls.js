const { html } = require('../../../script/escape-html');

module.exports = function createCarouselControlsHtml(id, classNameMap) {
  return html`
    <div glide-controls glide-for="${id}">
      <button
        class="${classNameMap.carousel_arrow}"
        prev
        data-glide-dir="<"
        disabled
      >
        <img
          src="confboxAsset('/assets/arrow_left-black.svg')"
          alt="Previous"
          loading="lazy"
        />
      </button>
      <button class="${classNameMap.carousel_arrow}" next data-glide-dir=">">
        <img
          src="confboxAsset('/assets/arrow_right-black.svg')"
          alt="Next"
          loading="lazy"
        />
      </button>
    </div>
  `.toString();
  // Nunjucks has bugs with String objects, so we to toString to get a primitive.
};
