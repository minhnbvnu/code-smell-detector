                          while (s12 !== peg$FAILED) {
                            s11.push(s12);
                            s12 = peg$parseframe_data();
                          }
                          if (s11 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c43(s5, s9, s11);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }