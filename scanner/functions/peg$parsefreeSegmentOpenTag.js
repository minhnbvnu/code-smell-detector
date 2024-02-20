function peg$parsefreeSegmentOpenTag() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c11) {
        s1 = peg$c11;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselineEnd();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
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