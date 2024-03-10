                          while (s12 !== peg$FAILED) {
                            s11.push(s12);
                            s12 = peg$parsejoint();
                          }
                          if (s11 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                              s12 = peg$c7;
                              peg$currPos++;
                            } else {
                              s12 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c8); }
                            }
                            if (s12 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c9(s3, s7, s9, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }