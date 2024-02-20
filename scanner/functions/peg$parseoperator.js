function peg$parseoperator() {
    var s0;
    s0 = peg$parsescale();

    if (s0 === peg$FAILED) {
      s0 = peg$parseslow();

      if (s0 === peg$FAILED) {
        s0 = peg$parsefast();

        if (s0 === peg$FAILED) {
          s0 = peg$parsetarget();

          if (s0 === peg$FAILED) {
            s0 = peg$parsebjorklund();

            if (s0 === peg$FAILED) {
              s0 = peg$parsestruct();

              if (s0 === peg$FAILED) {
                s0 = peg$parserotR();

                if (s0 === peg$FAILED) {
                  s0 = peg$parserotL();
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }