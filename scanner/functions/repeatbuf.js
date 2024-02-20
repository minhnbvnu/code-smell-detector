function repeatbuf(buf, cnt) {
  var array = [];
  for (var i = 0; i < cnt; i++) {
    array.push(buf);
  }
  return Buffer.concat(array);
}