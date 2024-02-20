function getLog(l, s) {
  let {p, c} = traverseU(SelectLog, x => ({p: [x, consExcept], x, c: x}), l, s)
  p = pushTo(p, ['%O'])
  for (let i = 2; i < p[I.LENGTH]; ++i) p[0] += ' <= %O'
  console.log.apply(console, p)
  return c
}