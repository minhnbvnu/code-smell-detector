function peg$parsequoted_key() {
      var s0, s1;

      var key    = peg$currPos * 49 + 11,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsedouble_quoted_single_line_string();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c22(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsesingle_quoted_single_line_string();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c22(s1);
        }
        s0 = s1;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }