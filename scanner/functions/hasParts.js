function hasParts(files) {
  return !_.isString(files) && !isStringArray(files);
}