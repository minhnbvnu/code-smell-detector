function peg$parsecodeSegment() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsecodeSegmentOpenTag();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestringNoDelim();
        if (s2 === peg$FAILED) {
          s2 = peg$c9;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecodeSegmentCloseTag();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseconsoleSection();
            if (s4 === peg$FAILED) {
              s4 = peg$c9;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseoutputSection();
              if (s5 === peg$FAILED) {
                s5 = peg$c9;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c13(s2, s4, s5);
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