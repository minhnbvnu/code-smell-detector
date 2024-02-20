function peg$parseslice_bjorklund() {
    var s0, s1, s3, s5, s7, s11, s13;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 40) {
      s1 = peg$c21;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$e28);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$parsews();
      s3 = peg$parseslice_with_modifier();

      if (s3 !== peg$FAILED) {
        peg$parsews();
        s5 = peg$parsecomma();

        if (s5 !== peg$FAILED) {
          peg$parsews();
          s7 = peg$parseslice_with_modifier();

          if (s7 !== peg$FAILED) {
            peg$parsews();
            peg$parsecomma();
            peg$parsews();
            s11 = peg$parseslice_with_modifier();

            if (s11 === peg$FAILED) {
              s11 = null;
            }

            peg$parsews();

            if (input.charCodeAt(peg$currPos) === 41) {
              s13 = peg$c22;
              peg$currPos++;
            } else {
              s13 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$e29);
              }
            }

            if (s13 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f8(s3, s7, s11);
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