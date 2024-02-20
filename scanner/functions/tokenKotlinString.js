function tokenKotlinString(tripleString){
    return function (stream, state) {
      var escaped = false, next, end = false;
      while (!stream.eol()) {
        if (!tripleString && !escaped && stream.match('"') ) {end = true; break;}
        if (tripleString && stream.match('"""')) {end = true; break;}
        next = stream.next();
        if(!escaped && next == "$" && stream.match('{'))
          stream.skipTo("}");
        escaped = !escaped && next == "\\" && !tripleString;
      }
      if (end || !tripleString)
        state.tokenize = null;
      return "string";
    }
  }