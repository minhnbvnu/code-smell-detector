function getLengths (bufs) {
  var lens = new Array(bufs.length)
  for (var i = 0; i < bufs.length; i++) lens[i] = bufs[i].length
  return lens
}