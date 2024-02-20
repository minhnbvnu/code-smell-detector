function peg$parsekeyword2() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8) === peg$c43) {
      s1 = peg$c43;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c44); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenon_whitespace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsewhitespace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenon_newline();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c45(s1, s3, s5);
              s0 = s1;
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
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }