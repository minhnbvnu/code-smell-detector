function unbox(data, offset) {
  if (data.length < 4 + offset) return null;

  var size = readUInt32BE(data, offset);

  // size includes first 4 bytes (length)
  if (data.length < size + offset || size < 8) return null;

  // if size === 1, real size is following uint64 (only for big boxes, not needed)
  // if size === 0, real size is until the end of the file (only for big boxes, not needed)

  return {
    boxtype: String.fromCharCode.apply(null, data.slice(offset + 4, offset + 8)),
    data:    data.slice(offset + 8, offset + size),
    end:     offset + size
  };
}