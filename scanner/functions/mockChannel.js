function mockChannel() {
  var transport = {
    setHandler: function setHandler() {},
    send: function send() {}
  };
  return new _storybook_channels__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"]({
    transport: transport
  });
}