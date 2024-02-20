function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}