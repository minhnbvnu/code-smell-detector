function envChanged(a, b) {
  return !_.isEqual(
    _.omit(a, 'PATH', 'PWD', 'CWD'),
    _.omit(b, 'PATH', 'PWD', 'CWD')
  );
}