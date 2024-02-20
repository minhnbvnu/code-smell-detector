function peg$parsemember() {
      var s0;

      s0 = peg$parsecomment();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepairs();
        if (s0 === peg$FAILED) {
          s0 = peg$parseobject();
        }
      }

      return s0;
    }