function peg$parsebjorklund() {
    var s0, s1, s3, s5;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 6) === peg$c28) {
      s1 = peg$c28;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e35);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$parsews();
      s3 = peg$parseint();

      if (s3 !== peg$FAILED) {
        peg$parsews();
        s5 = peg$parseint();

        if (s5 !== peg$FAILED) {
          peg$parsews();
          peg$parseint();
          peg$savedPos = s0;
          s0 = peg$f21(s3, s5);
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