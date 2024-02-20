function numberParts(v) {
  var ret = v.split('.', 4)
  .map(p => parseInt(p));

  while (ret.length < 4)
    ret.push(0);
  return ret;
}