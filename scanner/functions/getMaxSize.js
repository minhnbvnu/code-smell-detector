function getMaxSize (maxSize, isVR) {
  var size;
  size = {height: document.body.offsetHeight, width: document.body.offsetWidth};
  if (isVR) {
    return size;
  } else {
    return constrainSizeTo(size, maxSize);
  }
}