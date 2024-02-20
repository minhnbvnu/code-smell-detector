function registerLazyAttr(attr) {
  if (indexOf.call(lazyAttrs, attr) === -1) {
    lazyAttrs.push(attr);
  }
}