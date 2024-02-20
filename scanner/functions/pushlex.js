function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") { indent = state.lexical.indented; }
      else { for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        { indent = outer.indented; } }
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }