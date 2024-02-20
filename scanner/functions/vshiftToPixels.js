function vshiftToPixels(vshift, fontSize) {
  var i = vshift.indexOf('%');
  var pct = parseFloat(vshift);
  var px = fontSize * pct / 100;
  if (!px || i==-1) return '0';
  return roundTo(px, 1) + 'px';
}