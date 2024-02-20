function getASCIIEncoder(obj) {
  return function (data) {
    return data.replace(reEscapeChars, function (c) {
      return obj[c] || singleCharReplacer(c);
    });
  };
}