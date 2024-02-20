function assertException(func, re) {
  var e;
  try {
    func();
  } catch (err) {
    if (re.test(err.toString())) {
      return;
    }
    e = err;
  }
  throw (e || new Error('no error was thrown'));
}