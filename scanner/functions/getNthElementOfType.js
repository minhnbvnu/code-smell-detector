function getNthElementOfType(context, element, index) {
  let nthOfType = 0;
  for (let i = 0, child; (child = context.children[i]); i++) {
    if (child.nodeType === child.ELEMENT_NODE &&
        child.tagName.toLowerCase() === element.tagName.toLowerCase()) {
      if (nthOfType === index) {
        return child;
      }
      nthOfType++;
    }
  }
  return null;
}