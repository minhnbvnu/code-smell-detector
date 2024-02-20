function peg$parseinteger() {
      var s0, s1;

      var key    = peg$currPos * 49 + 25,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseinteger_text();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }