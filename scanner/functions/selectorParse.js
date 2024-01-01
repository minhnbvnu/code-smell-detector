function selectorParse (value) {
  if (!value) { return null; }
  if (typeof value !== 'string') { return value; }
  if (value[0] === '#' && !nonCharRegex.test(value)) {
    // When selecting element by ID only, use getElementById for better performance.
    // Don't match like #myId .child.
    return document.getElementById(value.substring(1));
  }
  return document.querySelector(value);
}