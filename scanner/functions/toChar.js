function toChar(a) {
  let d = a.toString();
  let c = d.split(/\.|\d/).join('');
  return c;
}