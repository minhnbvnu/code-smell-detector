function scan_iprp(data, sandbox) {
  var offset = 0;

  for (;;) {
    var box = unbox(data, offset);
    if (!box) break;
    if (box.boxtype === 'ipco') scan_ipco(box.data, sandbox);
    offset = box.end;
  }
}