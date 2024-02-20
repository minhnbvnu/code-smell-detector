function getNgAttribute(element, ngAttr) {
  var attr, i, ii = ngAttrPrefixes.length;
  for (i = 0; i < ii; ++i) {
    attr = ngAttrPrefixes[i] + ngAttr;
    if (isString(attr = element.getAttribute(attr))) {
      return attr;
    }
  }
  return null;
}