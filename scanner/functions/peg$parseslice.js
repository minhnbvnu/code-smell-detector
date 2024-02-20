function peg$parseslice() {
    var s0;
    s0 = peg$parsestep();

    if (s0 === peg$FAILED) {
      s0 = peg$parsesub_cycle();

      if (s0 === peg$FAILED) {
        s0 = peg$parsepolymeter();

        if (s0 === peg$FAILED) {
          s0 = peg$parseslow_sequence();
        }
      }
    }

    return s0;
  }