function tryEval(code) {
    var result = null;
    try {
      result = eval("(" + code + ")");
    } catch(error) {
      if (!(error instanceof SyntaxError)) {
        throw error;
      }
      try {
        result = eval(code);
      } catch(e) {
        if (e instanceof SyntaxError) {
          throw error;
        } else {
          throw e;
        }
      }
    }
    return result;
  }