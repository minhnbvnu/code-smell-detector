function iterEager(map, ap, of, xi2yA, t, s) {
  let r = of(iterCollect)
  while ((s = reNext(s, t)))
    r = ap(ap(map(iterCollect, of(s)), r), xi2yA(s[RE_VALUE], s[INDEX]))
  return r
}