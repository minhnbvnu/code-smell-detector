function transform_insert_delete(a, b) {
  if (a.type === DEL) {
    return transform_insert_delete(b, a);
  }
  // we can assume, that a is an insertion and b is a deletion
  // a is before b
  if (a.pos <= b.pos) {
    b.pos += a.str.length;
  }
  // a is after b
  else if (a.pos >= b.pos + b.str.length) {
    a.pos -= b.str.length;
  }
  // Note: this is a conflict case the user should be noticed about
  // If applied still, the deletion takes precedence
  // a.pos > b.pos && <= b.pos + b.length
  else {
    var s = a.pos - b.pos;
    b.str = b.str.slice(0, s) + a.str + b.str.slice(s);
    a.str = "";
  }
}