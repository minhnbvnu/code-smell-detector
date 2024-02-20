function errorGiven(m, o, e) {
  m = header + m + '.'
  e = e ? '\n' + e : ''
  console.error(m, 'Given:', o, e)
  throw Error(m + e)
}