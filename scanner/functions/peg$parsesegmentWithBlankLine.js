function peg$parsesegmentWithBlankLine() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsesegment();
      if (s1 !== peg$FAILED) {
        s2 = peg$parselineEnd();
        if (s2 === peg$FAILED) {
          s2 = peg$c9;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }