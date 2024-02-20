function verifyIsStub() {
    var method;

    for (var i = 0, l = arguments.length; i < l; ++i) {
      method = arguments[i];

      if (!method) {
        assert.fail("fake is not a spy");
      }

      if (typeof method != "function") {
        assert.fail(method + " is not a function");
      }

      if (typeof method.getCall != "function") {
        assert.fail(method + " is not stubbed");
      }
    }
  }