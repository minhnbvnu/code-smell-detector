function base64ToArray(b64String) {
  var binString = base64_decode(b64String);
  var outArray = [];
  var length = binString.length;
  for (var index = 0; index < length;) {
    outArray.push(binString.charCodeAt(index++) & 0xFF);
  }
  return outArray;
}