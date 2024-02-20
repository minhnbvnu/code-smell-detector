function peg$parseconsoleCloseTag() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parselineEnd();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c24) {
          s2 = peg$c24;
          peg$currPos += 5;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c25); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parselineEnd();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }