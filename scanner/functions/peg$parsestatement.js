function peg$parsestatement() {
    var s0;
    s0 = peg$parsemini_definition();

    if (s0 === peg$FAILED) {
      s0 = peg$parsecommand();
    }

    return s0;
  }