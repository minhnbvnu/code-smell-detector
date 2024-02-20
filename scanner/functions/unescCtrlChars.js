function unescCtrlChars(str) {  // unescape potentially problematic control characters
  return str.replace(/!\d\d?\d?!/g, function(c) { return String.fromCharCode(c.slice(1,-1)); });
}