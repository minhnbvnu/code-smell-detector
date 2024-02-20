function peg$parseslice_with_modifier() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parseslice();

    if (s1 !== peg$FAILED) {
      s2 = peg$parseslice_modifier();

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      peg$savedPos = s0;
      s0 = peg$f12(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }