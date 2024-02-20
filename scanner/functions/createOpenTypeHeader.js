function createOpenTypeHeader(sfnt, file, numTables) {
    // Windows hates the Mac TrueType sfnt version number
    if (sfnt == 'true')
      sfnt = string32(0x00010000);

    // sfnt version (4 bytes)
    var header = sfnt;

    // numTables (2 bytes)
    header += string16(numTables);

    // searchRange (2 bytes)
    var tablesMaxPower2 = getMaxPower2(numTables);
    var searchRange = tablesMaxPower2 * 16;
    header += string16(searchRange);

    // entrySelector (2 bytes)
    header += string16(Math.log(tablesMaxPower2) / Math.log(2));

    // rangeShift (2 bytes)
    header += string16(numTables * 16 - searchRange);

    file.file += header;
    file.virtualOffset += header.length;
  }