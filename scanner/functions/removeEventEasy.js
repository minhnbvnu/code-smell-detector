function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}