function scan_iloc(data, sandbox) {
  var offset_size = (data[4] >> 4) & 0xF;
  var length_size = data[4] & 0xF;
  var base_offset_size = (data[5] >> 4) & 0xF;
  var item_count = readUInt16BE(data, 6);
  var offset = 8;

  for (var i = 0; i < item_count; i++) {
    var item_ID = readUInt16BE(data, offset);
    offset += 2;

    var data_reference_index = readUInt16BE(data, offset);
    offset += 2;

    var base_offset = readUIntBE(data, offset, base_offset_size);
    offset += base_offset_size;

    var extent_count = readUInt16BE(data, offset);
    offset += 2;

    if (data_reference_index === 0 && extent_count === 1) {
      var first_extent_offset = readUIntBE(data, offset, offset_size);
      var first_extent_length = readUIntBE(data, offset + offset_size, length_size);
      sandbox.item_loc[item_ID] = { length: first_extent_length, offset: first_extent_offset + base_offset };
    }

    offset += extent_count * (offset_size + length_size);
  }
}