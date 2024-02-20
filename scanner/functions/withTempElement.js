function withTempElement(callback) {
  const tmpElement = document.createElement('div');
  callback(tmpElement);
  tmpElement.parentNode.removeChild(tmpElement);
}