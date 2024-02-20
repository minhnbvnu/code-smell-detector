function byteArrayToHexStr(b) {  // convert byte array to hex string for displaying test vectors
  var s = '';
  for (var i=0; i<b.length; i++) s += b[i].toString(16) + ' ';
  return s;
}