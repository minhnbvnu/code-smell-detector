function arrayToBase64(arrayIn) {
  var binString = "";
  var length = arrayIn.length;
  for (var index = 0; index < length; ++index) {
    if (typeof arrayIn[index] == "number") {
      binString += String.fromCharCode(arrayIn[index]);
    }
  }
  return base64(binString);
}