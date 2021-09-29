class MainMenu extends HTMLElement {
  constructor() {
    super();

    this.mql = window.matchMedia('(max-width: 719px)');
    this.mql_handler = e => {
      if (e.matches) {
        this.allowBodyScroll(this.open == 0);
      } else {
        this.allowBodyScroll(true);
      }
    };
  }
  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.getAttribute('open');
  }

  set open(newValue) {
    this.setAttribute('open', newValue);
  }

  connectedCallback() {
    this.open = 0;
    this.handleToggle();

    this.mql.addEventListener('change', this.mql_handler);
  }

  disconnectedCallback() {
    this.mql.removeEventListener('change', this.mql_handler);
  }

  handleToggle() {
    const button = document.getElementsByTagName('button')[0];

    button.addEventListener(
      'click',
      () => (this.open = this.open == 0 ? 1 : 0),
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'open':
        this.allowBodyScroll(newValue == 1 ? false : true);
        break;
    }
  }

  allowBodyScroll(allowScroll) {
    document.body.setAttribute('overlay-open', allowScroll ? 0 : 1);
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('main-menu', MainMenu);
}
