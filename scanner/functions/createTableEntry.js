function createTableEntry(file, tag, data) {
    // offset
    var offset = file.virtualOffset;

    // length
    var length = data.length;

    // Per spec tables must be 4-bytes align so add padding as needed
    while (data.length & 3)
      data.push(0x00);

    while (file.virtualOffset & 3)
      file.virtualOffset++;

    // checksum
    var checksum = 0, n = data.length;
    for (var i = 0; i < n; i += 4)
      checksum = (checksum + int32([data[i], data[i + 1], data[i + 2],
                                    data[i + 3]])) | 0;

    var tableEntry = (tag + string32(checksum) +
                      string32(offset) + string32(length));
    file.file += tableEntry;
    file.virtualOffset += data.length;
  }