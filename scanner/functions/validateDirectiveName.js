function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn("Do not use built-in directive ids as custom directive id: " + name);
    }
  }