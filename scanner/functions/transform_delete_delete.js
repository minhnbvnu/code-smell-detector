function transform_delete_delete(a, b, first) {
  // reduce to a normalized case
  if (a.pos > b.pos) {
    return transform_delete_delete(b, a, !first);
  }
  if (a.pos === b.pos && a.str.length > b.str.length) {
    return transform_delete_delete(b, a, !first);
  }
  // take out overlapping parts
  if (b.pos < a.pos + a.str.length) {
    var s = b.pos - a.pos;
    var s1 = a.str.length - s;
    var s2 = s + b.str.length;
    a.str = a.str.slice(0, s) + a.str.slice(s2);
    b.str = b.str.slice(s1);
    b.pos -= s;
  } else {
    b.pos -= a.str.length;
  }
}