function tokenBaseInner(stream, state, inFormat) {
      if (stream.eatSpace()) return null;

      // Handle Comments
      if (!inFormat && stream.match(/^#.*/)) return "comment";

      // Handle Number Literals
      if (stream.match(/^[0-9\.]/, false)) {
        var floatLiteral = false;
        // Floats
        if (stream.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
        if (stream.match(/^[\d_]+\.\d*/)) { floatLiteral = true; }
        if (stream.match(/^\.\d+/)) { floatLiteral = true; }
        if (floatLiteral) {
          // Float literals may be "imaginary"
          stream.eat(/J/i);
          return "number";
        }
        // Integers
        var intLiteral = false;
        // Hex
        if (stream.match(/^0x[0-9a-f_]+/i)) intLiteral = true;
        // Binary
        if (stream.match(/^0b[01_]+/i)) intLiteral = true;
        // Octal
        if (stream.match(/^0o[0-7_]+/i)) intLiteral = true;
        // Decimal
        if (stream.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)) {
          // Decimal literals may be "imaginary"
          stream.eat(/J/i);
          // TODO - Can you have imaginary longs?
          intLiteral = true;
        }
        // Zero by itself with no other piece of number.
        if (stream.match(/^0(?![\dx])/i)) intLiteral = true;
        if (intLiteral) {
          // Integer literals may be "long"
          stream.eat(/L/i);
          return "number";
        }
      }

      // Handle Strings
      if (stream.match(stringPrefixes)) {
        var isFmtString = stream.current().toLowerCase().indexOf('f') !== -1;
        if (!isFmtString) {
          state.tokenize = tokenStringFactory(stream.current(), state.tokenize);
          return state.tokenize(stream, state);
        } else {
          state.tokenize = formatStringFactory(stream.current(), state.tokenize);
          return state.tokenize(stream, state);
        }
      }

      for (var i = 0; i < operators.length; i++)
        if (stream.match(operators[i])) return "operator"

      if (stream.match(delimiters)) return "punctuation";

      if (state.lastToken == "." && stream.match(identifiers))
        return "property";

      if (stream.match(keywords) || stream.match(wordOperators))
        return "keyword";

      if (stream.match(builtins))
        return "builtin";

      if (stream.match(/^(self|cls)\b/))
        return "variable-2";

      if (stream.match(identifiers)) {
        if (state.lastToken == "def" || state.lastToken == "class")
          return "def";
        return "variable";
      }

      // Handle non-detected items
      stream.next();
      return inFormat ? null :ERRORCLASS;
    }