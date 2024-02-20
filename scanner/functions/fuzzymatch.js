function fuzzymatch(name2, names) {
    const set = new FuzzySet(names);
    const matches = set.get(name2);
    return matches && matches[0] && matches[0][0] > 0.7 ? matches[0][1] : null;
  }