function buildModuleTable(buffers) {
  // table format:
  //  - table_length: uint_32 length of all table entries in bytes + the table length itself
  //  - entries: entry...
  //
  // entry:
  //  - module_id: NUL terminated utf8 string
  //  - module_offset: uint_32 offset into the module string
  //  - module_length: uint_32 length in bytes of the module
  //  - module_line: uint_32 line on which module starts on the bundle

  const numBuffers = buffers.length;

  const tableLengthBuffer = uInt32Buffer(0);
  let tableLength = 4; // the table length itself, 4 == tableLengthBuffer.length
  let currentOffset = 0;
  let currentLine = 1;

  const offsetTable = [tableLengthBuffer];
  for (let i = 0; i < numBuffers; i++) {
    const {id, linesCount, buffer: {length}} = buffers[i];

    const entry = Buffer.concat([
      Buffer(i === 0 ? MAGIC_STARTUP_MODULE_ID : id, 'utf8'),
      nullByteBuffer,
      uInt32Buffer(currentOffset),
      uInt32Buffer(length),
      uInt32Buffer(currentLine),
    ]);

    currentLine += linesCount;

    currentOffset += length;
    tableLength += entry.length;
    offsetTable.push(entry);
  }

  tableLengthBuffer.writeUInt32LE(tableLength, 0);
  return Buffer.concat(offsetTable);
}