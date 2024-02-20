function peg$parsestack_or_choose() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parsesequence();

    if (s1 !== peg$FAILED) {
      s2 = peg$parsestack_tail();

      if (s2 === peg$FAILED) {
        s2 = peg$parsechoose_tail();
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      peg$savedPos = s0;
      s0 = peg$f16(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }