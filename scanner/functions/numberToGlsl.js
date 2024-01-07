function numberToGlsl(v) {
  const s = v.toString();
  return s.includes('.') ? s : s + '.0';
}