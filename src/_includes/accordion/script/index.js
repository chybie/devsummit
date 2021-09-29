let EnhanceAccordion = function(element) {
  element.removeAttribute('no-js');

  const items = element.querySelectorAll('[accordion-item]');

  function toggle(item) {
    const open = item.getAttribute('open');

    item.setAttribute('open', open === '1' ? '0' : '1');
  }

  items.forEach(item => {
    item.addEventListener('click', e => {
      toggle(e.currentTarget);
    });
  });

  return {
    items: items,
    toggle: toggle,
  };
};

export function enhance(elements) {
  elements.forEach(e => EnhanceAccordion(e));
}
