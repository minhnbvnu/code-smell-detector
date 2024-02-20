function FindWeight(a, wFrom, tHeight) {
  var w = 1, p;
  if(wFrom) {
    w = 1 * (a.getAttribute(wFrom) || tHeight);
  } else if(p = GetProperty(a,'font-size')) {
    w = (p.indexOf('px') > -1 && p.replace('px','') * 1) ||
      (p.indexOf('pt') > -1 && p.replace('pt','') * 1.25) ||
      p * 3.3;
  }
  return w;
}