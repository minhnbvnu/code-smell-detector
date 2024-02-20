function tan (x) {
      var s = (x instanceof NdArray) ? x.clone() : NdArray.new(x);
      ops.taneq(s.selection);
      return s;
    }