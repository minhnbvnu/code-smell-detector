function peg$parseslice_slow() {
    var s0, s1, s2;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 47) {
      s1 = peg$c23;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e30);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseslice();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f9(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }