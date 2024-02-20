function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}