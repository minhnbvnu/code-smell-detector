function toNum(a) {
  let d = a.toString();
  let c = d.split(/\D/).trim();
  let num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
  for (let i = 0; i < c.length; i++) {
    let len = c[i].length;
    c[i] = r[len] + c[i];
  }
  let res = c.join('');
  return res;
}