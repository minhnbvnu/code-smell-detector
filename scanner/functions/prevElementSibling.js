function prevElementSibling(elem) {
  var _a;
  var prev = elem.prev;
  while (prev !== null && !(0, domhandler_1.isTag)(prev)) _a = prev, prev = _a.prev;
  return prev;
}