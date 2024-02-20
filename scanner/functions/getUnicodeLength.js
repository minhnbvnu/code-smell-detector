function getUnicodeLength(str) {
  var length = 0;
  if (!str) return 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '%') length += 2;else length += str.charCodeAt(i) > 255 ? 2 : 1;
  }
  return length;
}