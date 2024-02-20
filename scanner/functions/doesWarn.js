function doesWarn(test, fn, regexp) {

  var output = capture();

  fn();

  if (arguments.length > 2) {
    if (typeof regexp === "string") {
      test.equal(output(), regexp);
    } else {
      test.assert(regexp.test(output()));
    }
  } else {
    test.assert(output().length);
  }

}