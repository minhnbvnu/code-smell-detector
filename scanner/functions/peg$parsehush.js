function peg$parsehush() {
    var s0, s1;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c39) {
      s1 = peg$c39;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e47);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f35();
    }

    s0 = s1;
    return s0;
  }