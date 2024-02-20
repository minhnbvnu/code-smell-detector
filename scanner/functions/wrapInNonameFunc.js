function wrapInNonameFunc(code) {
      return "function(source, args){\n".concat(code, "\n}");
    }