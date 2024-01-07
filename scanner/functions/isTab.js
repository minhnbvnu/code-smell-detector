function isTab(element) {
  let el = element;
  while (el != null) {
    if (el.getAttribute && el.getAttribute('is') === 'tabs-tab') return true;
    el = el.parentElement;
  }
  return false;
}