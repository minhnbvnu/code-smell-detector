function peg$parsezero() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 48) {
      s0 = peg$c3;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e6);
      }
    }

    return s0;
  }