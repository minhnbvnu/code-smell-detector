function stringToByteArray(str) {
  var arr = new Array(str.length);
  for (var a = 0; a < str.length; a++) {
    arr[a] = str.charCodeAt(a);
  }
  return arr;
}