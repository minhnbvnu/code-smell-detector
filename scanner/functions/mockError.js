function mockError() {
  var callback = arguments[arguments.length - 1];
  callback(new Error('mocked error'));
}