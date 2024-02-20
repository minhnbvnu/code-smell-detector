function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}