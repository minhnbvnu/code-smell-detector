function matchObject(expectation, actual) {
    if (actual === null || actual === undefined) {
      return false;
    }
    for (var key in expectation) {
      if (expectation.hasOwnProperty(key)) {
        var exp = expectation[key];
        var act = actual[key];
        if (match.isMatcher(exp)) {
          if (!exp.test(act)) {
            return false;
          }
        } else if (sinon.typeOf(exp) === "object") {
          if (!matchObject(exp, act)) {
            return false;
          }
        } else if (!sinon.deepEqual(exp, act)) {
          return false;
        }
      }
    }
    return true;
  }