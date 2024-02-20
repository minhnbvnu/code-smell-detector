function swapRows(m, k, l) {
  const p = m[k];
  m[k] = m[l];
  m[l] = p;
}