function assertErrorMessageStartsWith(em, fn) {
  try {
    fn();
  } catch(e) {
    if(!e instanceof Error) {
      throw "expected to catch Error, got " + e;
    }
    if(!e.message) {
      throw "error '" + e + "' has no message";
    }
    if(!e.message.startsWith(em)) {
      throw "error message '" + e.message + "' does not start with " + em;
    }
    return true;
  }
  throw "no Error thrown";
}