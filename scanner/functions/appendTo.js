function appendTo(xs, _, F, xi2yF) {
  const i = seemsArrayLike(xs) ? xs[I.LENGTH] : 0
  return F.map(x => setIndex(i, x, xs), xi2yF(void 0, i))
}