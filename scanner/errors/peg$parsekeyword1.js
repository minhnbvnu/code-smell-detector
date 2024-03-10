function peg$parsekeyword1() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 11) === peg$c16) {
        s1 = peg$c16;
        peg$currPos += 11;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c18) {
          s1 = peg$c18;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 5) === peg$c20) {
            s1 = peg$c20;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c21); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 11) === peg$c22) {
              s1 = peg$c22;
              peg$currPos += 11;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 4) === peg$c24) {
                s1 = peg$c24;
                peg$currPos += 4;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c25); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c26) {
                  s1 = peg$c26;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c27); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 10) === peg$c28) {
                    s1 = peg$c28;
                    peg$currPos += 10;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c29); }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 5) === peg$c30) {
                      s1 = peg$c30;
                      peg$currPos += 5;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c31); }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 9) === peg$c32) {
                        s1 = peg$c32;
                        peg$currPos += 9;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c33); }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c34) {
                          s1 = peg$c34;
                          peg$currPos += 7;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c35); }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.substr(peg$currPos, 6) === peg$c36) {
                            s1 = peg$c36;
                            peg$currPos += 6;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c37); }
                          }
                          if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 9) === peg$c38) {
                              s1 = peg$c38;
                              peg$currPos += 9;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c39); }
                            }
                            if (s1 === peg$FAILED) {
                              if (input.substr(peg$currPos, 7) === peg$c40) {
                                s1 = peg$c40;
                                peg$currPos += 7;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c41); }
                              }
                              if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 4) === peg$c56) {
                                  s1 = peg$c56;
                                  peg$currPos += 4;
                                } else {
                                  s1 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c57); }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenon_newline();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s1, s3);
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

    return s0;
  }