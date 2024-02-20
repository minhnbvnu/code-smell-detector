function getTriangleArea(p1, p2, p3) {
  //triangle edge lengths
  const a = len2(sub2( p1, p2));
  const b = len2(sub2( p1, p3));
  const c = len2(sub2( p2, p3));
  
  //Heron's formula
  const s = 0.5 * (a+b+c);
  return Math.sqrt( s * (s-a) * (s-b) * (s-c));
}