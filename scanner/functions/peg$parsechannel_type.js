function peg$parsechannel_type() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c24) {
        s1 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 9).toLowerCase() === peg$c26) {
          s1 = input.substr(peg$currPos, 9);
          peg$currPos += 9;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c27); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 9).toLowerCase() === peg$c28) {
            s1 = input.substr(peg$currPos, 9);
            peg$currPos += 9;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 9).toLowerCase() === peg$c30) {
              s1 = input.substr(peg$currPos, 9);
              peg$currPos += 9;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c31); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 9).toLowerCase() === peg$c32) {
                s1 = input.substr(peg$currPos, 9);
                peg$currPos += 9;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c33); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 9).toLowerCase() === peg$c34) {
                  s1 = input.substr(peg$currPos, 9);
                  peg$currPos += 9;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c35); }
                }
              }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s1);
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