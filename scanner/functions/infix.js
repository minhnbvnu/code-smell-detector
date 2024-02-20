function infix(s, f, p, w) {
    var x = symbol(s, p);
    reserveName(x);
    x.infix = true;
    x.led = function(left) {
      if (!w) {
        nobreaknonadjacent(state.tokens.prev, state.tokens.curr);
      }
      if ((s === "in" || s === "instanceof") && left.id === "!") {
        warning("W018", left, "!");
      }
      if (typeof f === "function") {
        return f(left, this);
      } else {
        this.left = left;
        this.right = expression(p);
        return this;
      }
    };
    return x;
  }