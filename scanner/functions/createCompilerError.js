function createCompilerError(code, loc, messages, additionalMessage) {
    const msg = (messages || errorMessages)[code] + (additionalMessage || ``) ;
    const error = new SyntaxError(String(msg));
    error.code = code;
    error.loc = loc;
    return error;
  }