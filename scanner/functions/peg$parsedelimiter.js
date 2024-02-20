function peg$parsedelimiter() {
      var s0;

      s0 = peg$parsefreeSegmentOpenTag();
      if (s0 === peg$FAILED) {
        s0 = peg$parsefreeSegmentCloseTag();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecodeSegmentOpenTag();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecodeSegmentCloseTag();
            if (s0 === peg$FAILED) {
              s0 = peg$parseoutputOpenTag();
              if (s0 === peg$FAILED) {
                s0 = peg$parseoutputCloseTag();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseconsoleOpenTag();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseconsoleCloseTag();
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }