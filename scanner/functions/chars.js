function chars(str, opts, fileName) {
  var result = disparity.chars(str, format(str, opts));
  if (!result) {
    return '';
  }
  // we add a line break at the end because it looks better
  return getHeader(fileName) + result + '\n';
}