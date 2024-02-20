function makeExtra(ok, name, actual, expected, stack) {
  var extra = {};
  if (!ok) {
    extra.error = Error();
    extra.error.name = 'Failed expectation';
    extra.error.stack = stack;
    extra.actual = actual;
    extra.expected = fmt('should match %s', expected);
    delete extra.error.code;
    delete extra.error.errno;
  }
  return extra;
}