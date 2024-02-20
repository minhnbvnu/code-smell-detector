function createDOMCompilerError(code, loc) {
    return createCompilerError(
      code,
      loc,
      DOMErrorMessages 
    );
  }