function* genMap(gen, fn) {
  for (const x of gen) yield fn(x);
}