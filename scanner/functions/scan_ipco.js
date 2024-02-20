function scan_ipco(data, sandbox) {
  var offset = 0;

  for (;;) {
    var box = unbox(data, offset);
    if (!box) break;

    switch (box.boxtype) {
      case 'ispe':
        sandbox.sizes.push({
          width:  readUInt32BE(box.data, 4),
          height: readUInt32BE(box.data, 8)
        });
        break;

      case 'irot':
        sandbox.transforms.push({
          type: 'irot',
          value: box.data[0] & 3
        });
        break;

      case 'imir':
        sandbox.transforms.push({
          type: 'imir',
          value: box.data[0] & 1
        });
        break;
    }

    offset = box.end;
  }
}