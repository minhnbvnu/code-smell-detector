function assignop(s, f, p) {
    var x = infix(s, typeof f === "function" ? f : function(left, that) {
      that.left = left;

      if (left && checkLeftSideAssign(left, that, { allowDestructuring: true })) {
        that.right = expression(10);
        return that;
      }

      error("E031", that);
    }, p);

    x.exps = true;
    x.assign = true;
    return x;
  }