function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      if (s2 === peg$FAILED) {
        s2 = peg$parsestring();
        if (s2 === peg$FAILED) {
          s2 = peg$parseoctothorpe();
        }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
        if (s2 === peg$FAILED) {
          s2 = peg$parsestring();
          if (s2 === peg$FAILED) {
            s2 = peg$parseoctothorpe();
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }