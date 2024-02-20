function commasep(what, end, sep) {
    function proceed(type, value) {
      if (sep ? sep.indexOf(type) > -1 : type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") { lex.pos = (lex.pos || 0) + 1; }
        return cont(function(type, value) {
          if (type == end || value == end) { return pass() }
          return pass(what)
        }, proceed);
      }
      if (type == end || value == end) { return cont(); }
      return cont(expect(end));
    }
    return function(type, value) {
      if (type == end || value == end) { return cont(); }
      return pass(what, proceed);
    };
  }