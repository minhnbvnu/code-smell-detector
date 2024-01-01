function styleParse (str, obj) {
  var chunks;
  var i;
  var item;
  var pos;
  var key;
  var val;

  obj = obj || {};

  chunks = getKeyValueChunks(str);
  for (i = 0; i < chunks.length; i++) {
    item = chunks[i];
    if (!item) { continue; }
    // Split with `.indexOf` rather than `.split` because the value may also contain colons.
    pos = item.indexOf(':');
    key = item.substr(0, pos).trim();
    val = item.substr(pos + 1).trim();
    obj[key] = val;
  }
  return obj;
}