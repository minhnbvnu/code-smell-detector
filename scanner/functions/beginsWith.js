function beginsWith(begin, whole) {
  if (whole.indexOf(begin) === 0) {
    return whole.substr(begin.length);
  }
}