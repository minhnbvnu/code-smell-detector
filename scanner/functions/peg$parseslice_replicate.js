function peg$parseslice_replicate() {
    var s0, s1, s2;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 33) {
      s1 = peg$c20;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e27);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsenumber();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f7(s2);
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