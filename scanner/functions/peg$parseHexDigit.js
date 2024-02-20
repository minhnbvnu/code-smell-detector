function peg$parseHexDigit() {
      var s0;

      if (peg$c84.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c85); }
      }

      return s0;
    }