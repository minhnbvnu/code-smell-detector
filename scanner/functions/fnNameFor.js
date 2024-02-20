function fnNameFor(func) {
      return func.name || func.toString().match(/^\s*function\s*(\w*)\s*\(/)[1];
    }