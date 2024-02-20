function createCMapTable(glyphs, deltas) {
    var ranges = getRanges(glyphs);

    var numTables = 1;
    var cmap = '\x00\x00' + // version
               string16(numTables) +  // numTables
               '\x00\x03' + // platformID
               '\x00\x01' + // encodingID
               string32(4 + numTables * 8); // start of the table record

    var segCount = ranges.length + 1;
    var segCount2 = segCount * 2;
    var searchRange = getMaxPower2(segCount) * 2;
    var searchEntry = Math.log(segCount) / Math.log(2);
    var rangeShift = 2 * segCount - searchRange;

    // Fill up the 4 parallel arrays describing the segments.
    var startCount = '';
    var endCount = '';
    var idDeltas = '';
    var idRangeOffsets = '';
    var glyphsIds = '';
    var bias = 0;

    if (deltas) {
      for (var i = 0; i < segCount - 1; i++) {
        var range = ranges[i];
        var start = range[0];
        var end = range[1];
        var offset = (segCount - i) * 2 + bias * 2;
        bias += (end - start + 1);

        startCount += string16(start);
        endCount += string16(end);
        idDeltas += string16(0);
        idRangeOffsets += string16(offset);

        var codes = range[2];
        for (var j = 0, jj = codes.length; j < jj; ++j)
          glyphsIds += string16(deltas[codes[j]]);
      }
    } else {
      for (var i = 0; i < segCount - 1; i++) {
        var range = ranges[i];
        var start = range[0];
        var end = range[1];
        var startCode = range[2][0];

        startCount += string16(start);
        endCount += string16(end);
        idDeltas += string16((startCode - start + 1) & 0xFFFF);
        idRangeOffsets += string16(0);
      }
    }

    endCount += '\xFF\xFF';
    startCount += '\xFF\xFF';
    idDeltas += '\x00\x01';
    idRangeOffsets += '\x00\x00';

    var format314 = '\x00\x00' + // language
                    string16(segCount2) +
                    string16(searchRange) +
                    string16(searchEntry) +
                    string16(rangeShift) +
                    endCount + '\x00\x00' + startCount +
                    idDeltas + idRangeOffsets + glyphsIds;

    return stringToArray(cmap +
                         '\x00\x04' + // format
                         string16(format314.length + 4) + // length
                         format314);
  }