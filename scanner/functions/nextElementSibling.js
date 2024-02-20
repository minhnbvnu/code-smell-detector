function nextElementSibling(elem) {
  var _a;
  var next = elem.next;
  while (next !== null && !(0, domhandler_1.isTag)(next)) _a = next, next = _a.next;
  return next;
}