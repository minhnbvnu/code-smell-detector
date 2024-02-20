function tokenSmarty(stream, state) {
      if (stream.match(rightDelimiter, true)) {
        if (version === 3) {
          state.depth--;
          if (state.depth <= 0) {
            state.tokenize = tokenTop;
          }
        } else {
          state.tokenize = tokenTop;
        }
        return cont("tag", null);
      }

      if (stream.match(leftDelimiter, true)) {
        state.depth++;
        return cont("tag", "startTag");
      }

      var ch = stream.next();
      if (ch == "$") {
        stream.eatWhile(regs.validIdentifier);
        return cont("variable-2", "variable");
      } else if (ch == "|") {
        return cont("operator", "pipe");
      } else if (ch == ".") {
        return cont("operator", "property");
      } else if (regs.stringChar.test(ch)) {
        state.tokenize = tokenAttribute(ch);
        return cont("string", "string");
      } else if (regs.operatorChars.test(ch)) {
        stream.eatWhile(regs.operatorChars);
        return cont("operator", "operator");
      } else if (ch == "[" || ch == "]") {
        return cont("bracket", "bracket");
      } else if (ch == "(" || ch == ")") {
        return cont("bracket", "operator");
      } else if (/\d/.test(ch)) {
        stream.eatWhile(/\d/);
        return cont("number", "number");
      } else {

        if (state.last == "variable") {
          if (ch == "@") {
            stream.eatWhile(regs.validIdentifier);
            return cont("property", "property");
          } else if (ch == "|") {
            stream.eatWhile(regs.validIdentifier);
            return cont("qualifier", "modifier");
          }
        } else if (state.last == "pipe") {
          stream.eatWhile(regs.validIdentifier);
          return cont("qualifier", "modifier");
        } else if (state.last == "whitespace") {
          stream.eatWhile(regs.validIdentifier);
          return cont("attribute", "modifier");
        } if (state.last == "property") {
          stream.eatWhile(regs.validIdentifier);
          return cont("property", null);
        } else if (/\s/.test(ch)) {
          last = "whitespace";
          return null;
        }

        var str = "";
        if (ch != "/") {
          str += ch;
        }
        var c = null;
        while (c = stream.eat(regs.validIdentifier)) {
          str += c;
        }
        for (var i=0, j=keyFunctions.length; i<j; i++) {
          if (keyFunctions[i] == str) {
            return cont("keyword", "keyword");
          }
        }
        if (/\s/.test(ch)) {
          return null;
        }
        return cont("tag", "tag");
      }
    }