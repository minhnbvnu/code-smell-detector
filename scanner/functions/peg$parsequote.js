function peg$parsequote() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 34) {
      s0 = peg$c6;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e12);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 39) {
        s0 = peg$c7;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$e13);
        }
      }
    }

    return s0;
  }