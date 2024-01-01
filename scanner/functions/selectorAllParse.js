function selectorAllParse (value) {
  if (!value) { return null; }
  if (typeof value !== 'string') { return value; }
  return Array.prototype.slice.call(document.querySelectorAll(value), 0);
}