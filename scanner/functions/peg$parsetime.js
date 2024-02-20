function peg$parsetime() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      var key    = peg$currPos * 49 + 36,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseDIGIT_OR_UNDER();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseDIGIT_OR_UNDER();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s4 = peg$c72;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c73); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseDIGIT_OR_UNDER();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseDIGIT_OR_UNDER();
              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                  s7 = peg$c72;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c73); }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseDIGIT_OR_UNDER();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseDIGIT_OR_UNDER();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsesecfragment();
                      if (s10 === peg$FAILED) {
                        s10 = peg$c25;
                      }
                      if (s10 !== peg$FAILED) {
                        s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10];
                        s1 = s2;
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c74(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }