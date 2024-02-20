function plusFn(l, r) {
  if (typeof l === 'undefined') return r;
  if (typeof r === 'undefined') return l;
  return l + r;
}