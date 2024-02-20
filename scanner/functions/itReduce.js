function itReduce(it, f, init) {
  let accum = init;

  for (let t of it) {
    accum = f(accum, t);
  }

  return accum;
}