function doProp(target, propertyName, value) {
  if (!target) {
    return;
  }
  if (value) {
    target[propertyName] = value;
  }
}