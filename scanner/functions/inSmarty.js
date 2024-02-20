function inSmarty(stream, state) {
    if (stream.match(rightDelim, true)) {
      state.tokenize = tokenizer;
      return ret("tag", null);
    }

    var ch = stream.next();
    if (ch == "$") {
      stream.eatWhile(regs.validIdentifier);
      return ret("variable-2", "variable");
    }
    else if (ch == ".") {
      return ret("operator", "property");
    }
    else if (regs.stringChar.test(ch)) {
      state.tokenize = inAttribute(ch);
      return ret("string", "string");
    }
    else if (regs.operatorChars.test(ch)) {
      stream.eatWhile(regs.operatorChars);
      return ret("operator", "operator");
    }
    else if (ch == "[" || ch == "]") {
      return ret("bracket", "bracket");
    }
    else if (/\d/.test(ch)) {
      stream.eatWhile(/\d/);
      return ret("number", "number");
    }
    else {
      if (state.last == "variable") {
        if (ch == "@") {
          stream.eatWhile(regs.validIdentifier);
          return ret("property", "property");
        }
        else if (ch == "|") {
          stream.eatWhile(regs.validIdentifier);
          return ret("qualifier", "modifier");
        }
      }
      else if (state.last == "whitespace") {
        stream.eatWhile(regs.validIdentifier);
        return ret("attribute", "modifier");
      }
      else if (state.last == "property") {
        stream.eatWhile(regs.validIdentifier);
        return ret("property", null);
      }
      else if (/\s/.test(ch)) {
        last = "whitespace";
        return null;
      }

      var str = "";
      if (ch != "/") {
    	str += ch;
      }
      var c = "";
      while ((c = stream.eat(regs.validIdentifier))) {
        str += c;
      }
      var i, j;
      for (i=0, j=keyFuncs.length; i<j; i++) {
        if (keyFuncs[i] == str) {
          return ret("keyword", "keyword");
        }
      }
      if (/\s/.test(ch)) {
    	return null;
      }
      return ret("tag", "tag");
    }
  }