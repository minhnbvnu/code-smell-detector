function tokenIdent(stream, state) {
      stream.eatWhile(isDigit);
      while (stream.eat(isDigit) || stream.eat(isNonDigit)) { }


      var cur = stream.current();

      if(state.sol && (cur == "package" || cur == "model" || cur == "when" || cur == "connector")) state.level++;
      else if(state.sol && cur == "end" && state.level > 0) state.level--;

      state.tokenize = null;
      state.sol = false;

      if (keywords.propertyIsEnumerable(cur)) return "keyword";
      else if (builtin.propertyIsEnumerable(cur)) return "builtin";
      else if (atoms.propertyIsEnumerable(cur)) return "atom";
      else return "variable";
    }