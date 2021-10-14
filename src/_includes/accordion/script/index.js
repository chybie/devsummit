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

    item.addEventListener('keydown', e => {
      console.log(e.key);
      if (e.key === 'Enter') {
        toggle(e.currentTarget);
      }
    });
  });

  return {
    items: items,
    toggle: toggle,
  };
};

export function enhance(target) {
  if (NodeList.prototype.isPrototypeOf(target)) {
    target.forEach(e => EnhanceAccordion(e));
  } else {
    EnhanceAccordion(target);
  }
}
