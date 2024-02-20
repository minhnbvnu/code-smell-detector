function peg$parsestep_char() {
    var s0;

    if (peg$r4.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e14);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 45) {
        s0 = peg$c1;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$e4);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 35) {
          s0 = peg$c8;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$e15);
          }
        }

        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s0 = peg$c0;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$e1);
            }
          }

          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 94) {
              s0 = peg$c9;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$e16);
              }
            }

            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 95) {
                s0 = peg$c10;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$e17);
                }
              }

              if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                  s0 = peg$c11;
                  peg$currPos++;
                } else {
                  s0 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$e18);
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }