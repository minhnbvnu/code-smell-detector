function getAttrValue(text, attr) {
    var match = text.match(getAttrRegexp(attr));
    return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : ""
  }