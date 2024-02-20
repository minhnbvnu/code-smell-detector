function isTemplated(dirname) {
  if (templateSettings.interpolate.test(dirname)) {
    return true;
  }
  return false;
}