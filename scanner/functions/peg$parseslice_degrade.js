function peg$parseslice_degrade() {
    var s0, s1, s2;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 63) {
      s1 = peg$c25;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e32);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsenumber();

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      peg$savedPos = s0;
      s0 = peg$f11(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }