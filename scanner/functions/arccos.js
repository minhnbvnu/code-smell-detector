function arccos (x) {
      var s = (x instanceof NdArray) ? x.clone() : NdArray.new(x);
      ops.acoseq(s.selection);
      return s;
    }