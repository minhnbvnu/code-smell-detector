function scan_meta(data, sandbox) {
  var offset = 4; // version + flags

  for (;;) {
    var box = unbox(data, offset);
    if (!box) break;
    if (box.boxtype === 'iprp') scan_iprp(box.data, sandbox);
    if (box.boxtype === 'iloc') scan_iloc(box.data, sandbox);
    if (box.boxtype === 'iinf') scan_iinf(box.data, sandbox);
    offset = box.end;
  }
}