function scan_iinf(data, sandbox) {
  var item_count = readUInt16BE(data, 4);
  var offset = 6;

  for (var i = 0; i < item_count; i++) {
    var box = unbox(data, offset);
    if (!box) break;
    if (box.boxtype === 'infe') {
      var item_id = readUInt16BE(box.data, 4);
      var item_name = '';

      for (var pos = 8; pos < box.data.length && box.data[pos]; pos++) {
        item_name += String.fromCharCode(box.data[pos]);
      }

      sandbox.item_inf[item_name] = item_id;
    }
    offset = box.end;
  }
}