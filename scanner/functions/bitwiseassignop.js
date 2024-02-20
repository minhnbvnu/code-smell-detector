function bitwiseassignop(s) {
    return assignop(s, function(left, that) {
      if (state.option.bitwise) {
        warning("W016", that, that.id);
      }

      if (left && checkLeftSideAssign(left, that)) {
        that.right = expression(10);
        return that;
      }
      error("E031", that);
    }, 20);
  }