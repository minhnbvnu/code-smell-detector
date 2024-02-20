function assertArgs(spy, call, expected) {
    return function() {
      var env = jasmine.getEnv(),
          actual = spy.calls[call] ? spy.calls[call].args : undefined;

      return env.equals_(actual, expected);
    };
  }