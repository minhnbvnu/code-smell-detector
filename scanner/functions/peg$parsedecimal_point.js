function peg$parsedecimal_point() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 46) {
      s0 = peg$c0;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e1);
      }
    }

    return s0;
  }