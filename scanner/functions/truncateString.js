function truncateString(str, maxlen, useEllipsis) {
  // TODO: add ellipsis, truncate at word boundary
  if (str.length > maxlen) {
    str = str.substr(0, maxlen);
    if (useEllipsis) str += '...';
  }
  return str;
}