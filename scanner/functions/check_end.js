function check_end(l, r) {
  return l.slice(l.length - r.length) === r
}