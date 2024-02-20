function peg$parseworksheet() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseworksheetHeader();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsesegmentWithBlankLine();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsesegmentWithBlankLine();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c2(s2);
          s0 = s1;
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