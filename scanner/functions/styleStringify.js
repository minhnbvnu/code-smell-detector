function styleStringify (obj) {
  var key;
  var keyCount = 0;
  var i = 0;
  var str = '';

  for (key in obj) { keyCount++; }

  for (key in obj) {
    str += (key + ': ' + obj[key]);
    if (i < keyCount - 1) { str += '; '; }
    i++;
  }
  return str;
}