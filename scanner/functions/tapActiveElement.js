function tapActiveElement(ele) {
  if (arguments.length) {
    tapActiveEle = ele;
  }
  return tapActiveEle || document.activeElement;
}