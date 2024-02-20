function customLinear(t, b, c, d) {
  if ( t > d ) return b + c;
  const ratio = t / d;
  return b + (c * ratio);
}