function peg$parsesequ_or_operator_or_comment() {
    var s0, s1;
    s0 = peg$currPos;
    s1 = peg$parsemini_or_operator();

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f31(s1);
    }

    s0 = s1;

    if (s0 === peg$FAILED) {
      s0 = peg$parsecomment();
    }

    return s0;
  }