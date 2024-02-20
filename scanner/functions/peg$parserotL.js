function peg$parserotL() {
    var s0, s1, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 4) === peg$c30) {
      s1 = peg$c30;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e37);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$parsews();
      s3 = peg$parsenumber();

      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f23(s3);
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