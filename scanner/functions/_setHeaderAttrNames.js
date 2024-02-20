function _setHeaderAttrNames(dest, prefix) {
  Object.keys(HEADER_ATTR_NAMES).forEach(function forEachHeader(h) {
    dest[h] = prefix + HEADER_ATTR_NAMES[h]
  })
}