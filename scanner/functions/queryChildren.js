function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) {
    return matches(child, selector);
  });
}