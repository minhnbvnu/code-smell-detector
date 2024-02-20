function doTemplateLiteral(left) {
    var ctx = this.context;
    var noSubst = this.noSubst;
    var depth = this.depth;

    if (!noSubst) {
      while (!end()) {
        if (!state.tokens.next.template || state.tokens.next.depth > depth) {
          expression(0); // should probably have different rbp?
        } else {
          advance();
        }
      }
    }

    return {
      id: "(template)",
      type: "(template)",
      tag: left
    };

    function end() {
      if (state.tokens.curr.template && state.tokens.curr.tail &&
          state.tokens.curr.context === ctx) return true;
      var complete = (state.tokens.next.template && state.tokens.next.tail &&
                      state.tokens.next.context === ctx);
      if (complete) advance();
      return complete || state.tokens.next.isUnclosed;
    }
  }