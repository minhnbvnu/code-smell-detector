function peg$parseslice_modifier() {
    var s0;
    s0 = peg$parseslice_weight();

    if (s0 === peg$FAILED) {
      s0 = peg$parseslice_bjorklund();

      if (s0 === peg$FAILED) {
        s0 = peg$parseslice_slow();

        if (s0 === peg$FAILED) {
          s0 = peg$parseslice_fast();

          if (s0 === peg$FAILED) {
            s0 = peg$parseslice_replicate();

            if (s0 === peg$FAILED) {
              s0 = peg$parseslice_degrade();
            }
          }
        }
      }
    }

    return s0;
  }