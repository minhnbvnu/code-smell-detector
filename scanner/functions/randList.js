function randList(list, count) {
  var vals = list.slice();
  var res = [];

  while (count--) {
    res.push(vals.splice(randInt(0, vals.length), 1)[0]);
  }
  return res;
}