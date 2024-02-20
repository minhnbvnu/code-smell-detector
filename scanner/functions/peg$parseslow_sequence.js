function peg$parseslow_sequence() {
    var s0, s2, s4, s6;
    s0 = peg$currPos;
    peg$parsews();

    if (input.charCodeAt(peg$currPos) === 60) {
      s2 = peg$c17;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e24);
      }
    }

    if (s2 !== peg$FAILED) {
      peg$parsews();
      s4 = peg$parsesequence();

      if (s4 !== peg$FAILED) {
        peg$parsews();

        if (input.charCodeAt(peg$currPos) === 62) {
          s6 = peg$c18;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }

        if (s6 !== peg$FAILED) {
          peg$parsews();
          peg$savedPos = s0;
          s0 = peg$f5(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
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