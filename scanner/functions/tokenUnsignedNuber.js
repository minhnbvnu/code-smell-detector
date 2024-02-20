function tokenUnsignedNuber(stream, state) {
      stream.eatWhile(isDigit);
      if (stream.eat('.')) {
        stream.eatWhile(isDigit);
      }
      if (stream.eat('e') || stream.eat('E')) {
        if (!stream.eat('-'))
          stream.eat('+');
        stream.eatWhile(isDigit);
      }

      state.tokenize = null;
      state.sol = false;
      return "number";
    }