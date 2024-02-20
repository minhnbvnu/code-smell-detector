function badruns (length) {
    var i
    var runsbad = 0
    for (i = 0; i <= length; i++) {
      if (rlens[i] >= 5) { runsbad += N1 + rlens[i] - 5 }
    }
    // BwBBBwB as in finder
    for (i = 3; i < length - 1; i += 2) {
      if (rlens[i - 2] == rlens[i + 2] &&
                rlens[i + 2] == rlens[i - 1] &&
                rlens[i - 1] == rlens[i + 1] &&
                rlens[i - 1] * 3 == rlens[i] &&
                // white around the black pattern? Not part of spec
                (rlens[i - 3] == 0 || // beginning
                    i + 3 > length || // end
                    rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4)
      ) { runsbad += N3 }
    }
    return runsbad
  }