function focusInInput(event) {
  var target = event.target;
  return /input|textarea/i.test(target.tagName) || target.getAttribute('contenteditable') !== null;
}