function polymeterSteps(steps, ...args) {
  const seqs = args.map(a2 => _sequenceCount(a2));

  if (seqs.length == 0) {
    return silence;
  }

  if (steps == 0) {
    steps = seqs[0][1];
  }

  const pats = [];

  for (const seq2 of seqs) {
    if (seq2[1] == 0) {
      continue;
    }

    if (steps == seq2[1]) {
      pats.push(seq2[0]);
    } else {
      pats.push(seq2[0]._fast(fraction(steps).div(fraction(seq2[1]))));
    }
  }

  return _stack(...pats);
}