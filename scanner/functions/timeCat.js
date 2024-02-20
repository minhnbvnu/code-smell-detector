function timeCat(...timepats) {
  const total = timepats.map(a2 => a2[0]).reduce((a2, b) => a2.add(b), fraction(0));
  let begin = fraction(0);
  const pats = [];

  for (const [time2, pat] of timepats) {
    const end = begin.add(time2);
    pats.push(reify(pat)._compress(begin.div(total), end.div(total)));
    begin = end;
  }

  return _stack(...pats);
}