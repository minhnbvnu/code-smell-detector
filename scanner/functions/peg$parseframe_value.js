function peg$parseframe_value() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsefloat();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c47.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c47.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c48); }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c49(s1);
          s0 = s1;
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