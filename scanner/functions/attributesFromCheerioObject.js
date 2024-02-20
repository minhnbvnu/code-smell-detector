function attributesFromCheerioObject($element, names) {
  var attributes = {};
  names.forEach(function (name) {
    var value = $element.attr(name);
    if (RE_NUMBER_ATTRIBUTES.test(name)) value = parseFloat(value) || 0;
    if (value != null) attributes[name] = value;
  });
  attributes.type = $element.get(0).tagName;
  return attributes;
}