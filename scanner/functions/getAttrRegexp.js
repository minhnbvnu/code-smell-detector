function getAttrRegexp(attr) {
    var regexp = attrRegexpCache[attr];
    if (regexp) { return regexp; }
    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
  }