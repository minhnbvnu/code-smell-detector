function findWithAssert(app, selector, context) {
  var $el = find(app, selector, context);
  if ($el.length === 0) {
    throw new Error("Element " + selector + " not found.");
  }
  return $el;
}