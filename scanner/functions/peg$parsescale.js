function peg$parsescale() {
    var s0, s1, s3, s4, s5;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 5) === peg$c33) {
      s1 = peg$c33;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e40);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$parsews();
      s3 = peg$parsequote();

      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$parsestep_char();

        if (s5 !== peg$FAILED) {
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsestep_char();
          }
        } else {
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parsequote();

          if (s5 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f26(s4);
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