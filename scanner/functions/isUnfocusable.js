function isUnfocusable(el) { // eslint-disable-line no-unused-vars
  var oldActiveElement = document.activeElement;
  el.focus();
  if (document.activeElement !== oldActiveElement) {
    LOG.info('document.activeElement !== oldActiveElement');
    return false;
  }
  if (document.activeElement === el) {
    LOG.info('document.activeElement === el');
    return false;
  }
  // Can't use tabIndex property here because Edge says a <div> has
  // a tabIndex of 0 by default, even though calling focus() on it does
  // not actually focus it.
  if (el.hasAttribute('tabindex') && el.getAttribute('tabindex') === '0') {
    LOG.info('el.getAttribute(tabindex) === 0');
    return false;
  }
  return true;
}