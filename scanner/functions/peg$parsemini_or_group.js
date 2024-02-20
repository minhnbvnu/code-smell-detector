function peg$parsemini_or_group() {
    var s0;
    s0 = peg$parsecat();

    if (s0 === peg$FAILED) {
      s0 = peg$parsemini();
    }

    return s0;
  }