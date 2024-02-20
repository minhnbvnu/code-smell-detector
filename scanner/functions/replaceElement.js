function replaceElement(elem, replacement) {
  var prev = replacement.prev = elem.prev;
  if (prev) {
    prev.next = replacement;
  }
  var next = replacement.next = elem.next;
  if (next) {
    next.prev = replacement;
  }
  var parent = replacement.parent = elem.parent;
  if (parent) {
    var childs = parent.children;
    childs[childs.lastIndexOf(elem)] = replacement;
  }
}