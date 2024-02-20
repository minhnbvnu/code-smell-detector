function peg$parsemini_or_operator() {
    var s0, s1, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$parsemini_or_group();

    if (s1 !== peg$FAILED) {
      peg$parsews();
      s3 = [];
      s4 = peg$parsecomment();

      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parsecomment();
      }

      peg$savedPos = s0;
      s0 = peg$f29(s1);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseoperator();

      if (s1 !== peg$FAILED) {
        peg$parsews();

        if (input.charCodeAt(peg$currPos) === 36) {
          s3 = peg$c36;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$e44);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsews();
          s5 = peg$parsemini_or_operator();

          if (s5 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f30(s1, s5);
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
    }

    return s0;
  }