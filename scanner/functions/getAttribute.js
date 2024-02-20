function getAttribute(name, elem) {
  if (!elem) {
    return null;
  }
  var attribs = elem.attribs;
  return attribs[name];
}