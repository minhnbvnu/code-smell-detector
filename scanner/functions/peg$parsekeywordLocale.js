function peg$parsekeywordLocale() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 11) === peg$c46) {
      s1 = peg$c46;
      peg$currPos += 11;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c47); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c48) {
        s1 = peg$c48;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c50;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$currPos;
        s5 = [];
        if (peg$c52.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s6 !== peg$FAILED) {
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            if (peg$c52.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c53); }
            }
          }
        } else {
          s5 = peg$FAILED;
        }
        if (s5 !== peg$FAILED) {
          s4 = input.substring(s4, peg$currPos);
        } else {
          s4 = s5;
        }
        if (s4 !== peg$FAILED) {
          peg$savedPos = s2;
          s3 = peg$c54(s1, s4);
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhitespace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenon_newline();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55(s1, s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }