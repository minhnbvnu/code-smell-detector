function peg$parsepolymeter() {
    var s0, s2, s4, s6, s7;
    s0 = peg$currPos;
    peg$parsews();

    if (input.charCodeAt(peg$currPos) === 123) {
      s2 = peg$c14;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e21);
      }
    }

    if (s2 !== peg$FAILED) {
      peg$parsews();
      s4 = peg$parsepolymeter_stack();

      if (s4 !== peg$FAILED) {
        peg$parsews();

        if (input.charCodeAt(peg$currPos) === 125) {
          s6 = peg$c15;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }

        if (s6 !== peg$FAILED) {
          s7 = peg$parsepolymeter_steps();

          if (s7 === peg$FAILED) {
            s7 = null;
          }

          peg$parsews();
          peg$savedPos = s0;
          s0 = peg$f3(s4, s7);
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