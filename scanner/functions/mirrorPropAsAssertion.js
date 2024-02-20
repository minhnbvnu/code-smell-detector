function mirrorPropAsAssertion(name, method, message) {
    if (arguments.length == 2) {
      message = method;
      method = name;
    }

    assert[name] = function (fake) {
      verifyIsStub(fake);

      var args = slice.call(arguments, 1);
      var failed = false;

      if (typeof method == "function") {
        failed = !method(fake);
      } else {
        failed = typeof fake[method] == "function" ?
          !fake[method].apply(fake, args) : !fake[method];
      }

      if (failed) {
        failAssertion(this, fake.printf.apply(fake, [message].concat(args)));
      } else {
        assert.pass(name);
      }
    };
  }