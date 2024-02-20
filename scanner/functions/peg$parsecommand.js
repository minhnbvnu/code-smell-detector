function peg$parsecommand() {
    var s0, s2;
    s0 = peg$currPos;
    peg$parsews();
    s2 = peg$parsesetcps();

    if (s2 === peg$FAILED) {
      s2 = peg$parsesetbpm();

      if (s2 === peg$FAILED) {
        s2 = peg$parsehush();
      }
    }

    if (s2 !== peg$FAILED) {
      peg$parsews();
      peg$savedPos = s0;
      s0 = peg$f32(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }