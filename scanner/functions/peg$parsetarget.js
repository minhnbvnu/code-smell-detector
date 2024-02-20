function peg$parsetarget() {
    var s0, s1, s3, s4, s5;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c27) {
      s1 = peg$c27;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e34);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$parsews();
      s3 = peg$parsequote();

      if (s3 !== peg$FAILED) {
        s4 = peg$parsestep();

        if (s4 !== peg$FAILED) {
          s5 = peg$parsequote();

          if (s5 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f20(s4);
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
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }