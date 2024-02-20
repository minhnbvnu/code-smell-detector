function haxeTokenString(quote) {
    return function(stream, state) {
      if (toUnescaped(stream, quote))
        state.tokenize = haxeTokenBase;
      return ret("string", "string");
    };
  }