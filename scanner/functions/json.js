function json(js) {
  // Don't json encode the string if debug is disabled.
  if (this.enabled) {
    var s = JSON.stringify(js);

    if (s.length < MAX)
      return s;

    return s.substring(0, MAX) + '...';
  }
  return '';
}