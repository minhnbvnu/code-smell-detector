function peg$parsesegment() {
      var s0;

      s0 = peg$parsefreeSegment();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecodeSegment();
      }

      return s0;
    }