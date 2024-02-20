function peg$parsesub_cycle() {
    var s0, s2, s4, s6;
    s0 = peg$currPos;
    peg$parsews();

    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c12;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e19);
      }
    }

    if (s2 !== peg$FAILED) {
      peg$parsews();
      s4 = peg$parsestack_or_choose();

      if (s4 !== peg$FAILED) {
        peg$parsews();

        if (input.charCodeAt(peg$currPos) === 93) {
          s6 = peg$c13;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$e20);
          }
        }

        if (s6 !== peg$FAILED) {
          peg$parsews();
          peg$savedPos = s0;
          s0 = peg$f2(s4);
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