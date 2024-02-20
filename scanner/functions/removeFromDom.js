function removeFromDom(el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}