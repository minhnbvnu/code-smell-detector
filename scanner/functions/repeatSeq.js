function repeatSeq(seq, count) {
  var result = seq.slice(0, 0);
  while (count-- > 0) {
    result = result.concat(seq);
  }
  return result;
}