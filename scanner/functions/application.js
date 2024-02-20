function application(s) {
    var x = symbol(s, 42);

    x.led = function(left) {
      nobreaknonadjacent(state.tokens.prev, state.tokens.curr);

      this.left = left;
      this.right = doFunction({ type: "arrow", loneArg: left });
      return this;
    };
    return x;
  }