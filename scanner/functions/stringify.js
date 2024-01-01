function stringify (data) {
  var str;
  if (typeof data !== 'object') { return data; }
  str = data.x + ' ' + data.y;
  if (data.z != null) { str += ' ' + data.z; }
  if (data.w != null) { str += ' ' + data.w; }
  return str;
}