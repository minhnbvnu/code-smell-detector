function peg$parsecat() {
    var s0, s1, s3, s5, s6, s7, s8, s9;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 3) === peg$c35) {
      s1 = peg$c35;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e43);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$parsews();

      if (input.charCodeAt(peg$currPos) === 91) {
        s3 = peg$c12;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$e19);
        }
      }

      if (s3 !== peg$FAILED) {
        peg$parsews();
        s5 = peg$parsemini_or_operator();

        if (s5 !== peg$FAILED) {
          s6 = [];
          s7 = peg$currPos;
          s8 = peg$parsecomma();

          if (s8 !== peg$FAILED) {
            s9 = peg$parsemini_or_operator();

            if (s9 !== peg$FAILED) {
              peg$savedPos = s7;
              s7 = peg$f27(s5, s9);
            } else {
              peg$currPos = s7;
              s7 = peg$FAILED;
            }
          } else {
            peg$currPos = s7;
            s7 = peg$FAILED;
          }

          while (s7 !== peg$FAILED) {
            s6.push(s7);
            s7 = peg$currPos;
            s8 = peg$parsecomma();

            if (s8 !== peg$FAILED) {
              s9 = peg$parsemini_or_operator();

              if (s9 !== peg$FAILED) {
                peg$savedPos = s7;
                s7 = peg$f27(s5, s9);
              } else {
                peg$currPos = s7;
                s7 = peg$FAILED;
              }
            } else {
              peg$currPos = s7;
              s7 = peg$FAILED;
            }
          }

          s7 = peg$parsews();

          if (input.charCodeAt(peg$currPos) === 93) {
            s8 = peg$c13;
            peg$currPos++;
          } else {
            s8 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$e20);
            }
          }

          if (s8 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f28(s5, s6);
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