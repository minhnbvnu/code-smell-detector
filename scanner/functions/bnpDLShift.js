function bnpDLShift(o,n) {
  var i, t,r=Array((t=o.t)+n);
  for(i = t-1; i >= 0; --i) r[i+n] = o[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = t+n;
  r.s = o.s;
  return r;
}