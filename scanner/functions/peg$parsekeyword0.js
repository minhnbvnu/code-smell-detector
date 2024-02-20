function peg$parsekeyword0() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8) === peg$c11) {
      s1 = peg$c11;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c12); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c13(s1);
    }
    s0 = s1;

    return s0;
  }