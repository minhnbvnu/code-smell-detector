function peg$parse_() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c58.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c58.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c59); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c60();
      }
      s0 = s1;

      return s0;
    }