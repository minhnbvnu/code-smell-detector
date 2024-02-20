function peg$parsesingle_quoted_multiline_string() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 49 + 16,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c29) {
        s1 = peg$c29;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNL();
        if (s2 === peg$FAILED) {
          s2 = peg$c25;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsemultiline_literal_char();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsemultiline_literal_char();
          }
          if (s3 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c29) {
              s4 = peg$c29;
              peg$currPos += 3;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c30); }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c26(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }