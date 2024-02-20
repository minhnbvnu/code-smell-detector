function basicToken(stream,state){
    var cur = '';
    var ch = stream.next();
    // comment
    if (state.blockComment) {
      if (ch == "-" && stream.match("-;", true)) {
        state.blockComment = false;
      } else if (stream.skipTo("--;")) {
        stream.next();
        stream.next();
        stream.next();
        state.blockComment = false;
      } else {
        stream.skipToEnd();
      }
      return "comment";
    }
    if(ch == ";") {
      if (stream.match("--", true)) {
        if (!stream.match("-", false)) {  // Except ;--- is not a block comment
          state.blockComment = true;
          return "comment";
        }
      }
      stream.skipToEnd();
      return "comment";
    }
    // context
    if(ch == '[') {
      stream.skipTo(']');
      stream.eat(']');
      return "header";
    }
    // string
    if(ch == '"') {
      stream.skipTo('"');
      return "string";
    }
    if(ch == "'") {
      stream.skipTo("'");
      return "string-2";
    }
    // dialplan commands
    if(ch == '#') {
      stream.eatWhile(/\w/);
      cur = stream.current();
      if(dpcmd.indexOf(cur) !== -1) {
        stream.skipToEnd();
        return "strong";
      }
    }
    // application args
    if(ch == '$'){
      var ch1 = stream.peek();
      if(ch1 == '{'){
        stream.skipTo('}');
        stream.eat('}');
        return "variable-3";
      }
    }
    // extension
    stream.eatWhile(/\w/);
    cur = stream.current();
    if(atoms.indexOf(cur) !== -1) {
      state.extenStart = true;
      switch(cur) {
        case 'same': state.extenSame = true; break;
        case 'include':
        case 'switch':
        case 'ignorepat':
          state.extenInclude = true;break;
        default:break;
      }
      return "atom";
    }
  }