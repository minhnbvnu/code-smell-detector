function attributesFromSVGElement(element, names) {
  var attributes = {};
  names.forEach(function (name) {
    var value = element.getAttribute(name);
    if (RE_NUMBER_ATTRIBUTES.test(name)) value = parseFloat(value) || 0;
    if (value != null) attributes[name] = value;
  });
  attributes.type = element.nodeName;
  return attributes;
}