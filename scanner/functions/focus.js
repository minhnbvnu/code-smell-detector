function focus(el) {
  if (!isElement(el)) {
    return;
  }
  if (!el.getAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1');
  }
  el.focus();
}