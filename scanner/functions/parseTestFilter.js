function parseTestFilter(s) {
  if (/_\*$/.test(s)) return new RegExp("^" + s.slice(0, s.length - 2), "i");
  else return new RegExp(s, "i");
}