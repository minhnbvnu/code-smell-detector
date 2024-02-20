function peg$parsestep() {
    var s0, s2, s3;
    s0 = peg$currPos;
    peg$parsews();
    s2 = [];
    s3 = peg$parsestep_char();

    if (s3 !== peg$FAILED) {
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsestep_char();
      }
    } else {
      s2 = peg$FAILED;
    }

    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      peg$savedPos = s0;
      s0 = peg$f1(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }