function isUnknownElement (tag) {
  // Lynx Modify
  if(isLynxTag(tag)) {
    return false
  }
  return true
  // /* istanbul ignore if */
  // if (!inBrowser) {
  //   return true
  // }
  // if (isReservedTag(tag)) {
  //   return false
  // }
  // tag = tag.toLowerCase()
  // /* istanbul ignore if */
  // if (unknownElementCache[tag] != null) {
  //   return unknownElementCache[tag]
  // }
  // const el = document.createElement(tag)
  // if (tag.indexOf('-') > -1) {
  //   // http://stackoverflow.com/a/28210364/1070244
  //   return (unknownElementCache[tag] = (
  //     el.constructor === window.HTMLUnknownElement ||
  //     el.constructor === window.HTMLElement
  //   ))
  // } else {
  //   return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  // }
}