function* gen(x) {
  const y = yield x + 6;
  return y;
}