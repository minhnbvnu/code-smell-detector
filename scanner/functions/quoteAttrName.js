function quoteAttrName(attr) {
  // Quote invalid JS identifiers.
  if (!/^[a-z_$][a-z\d_$]*$/i.test(attr)) {
    return '"' + attr + '"';
  }
  return attr;
}