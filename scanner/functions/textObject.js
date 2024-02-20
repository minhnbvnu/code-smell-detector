function textObject(textEl) {
  var isSVGEl = false;

  if (isSVGElement(textEl)) isSVGEl = true;else if (isCheerioObject(textEl)) {} // do nothing
  else return null;

  var attributes = {};
  var children = isSVGEl ? textEl.children : textEl.children();

  // no <tspan>
  if (children.length === 0) {
    attributes = attributesFromElement(textEl, ['transform', 'font-size', 'letter-spacing']);
    attributes.text = isSVGEl ? textEl.textContent : textEl.text();
    attributes.children = [];
    return attributes;
  }

  // has <tspan>
  attributes = attributesFromElement(textEl, ['transform']);
  attributes.children = [];
  Array.prototype.forEach.call(children, function (childEl) {
    if (!isSVGEl) childEl = textEl.constructor(childEl);
    if (type(childEl) !== 'tspan') return;
    var obj = attributesFromElement(childEl, ['x', 'y', 'font-size', 'letter-spacing']);
    obj.text = isSVGEl ? childEl.textContent : childEl.text();
    attributes.children.push(obj);
  });
  return attributes;
}