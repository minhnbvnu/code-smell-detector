function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += a.str.length;
  }
  else if (a.pos < b.pos) {
    b.pos += a.str.length;
  }
  else {
    a.pos += b.str.length;
  }
}