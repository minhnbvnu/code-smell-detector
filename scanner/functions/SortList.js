function SortList(l, f) {
  var nl = [], tl = l.length, i;
  for(i = 0; i < tl; ++i)
    nl.push(l[i]);
  nl.sort(f);
  return nl;
}