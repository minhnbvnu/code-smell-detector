function blankObjectUndefined(obj) {
  return obj && Object.keys(obj).length ? obj : undefined;
}