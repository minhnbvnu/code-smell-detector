function createCmapTable(glyphs, numGlyphs) {
    var ranges = getRanges(glyphs, numGlyphs);
    var numTables = ranges[ranges.length - 1][1] > 0xffff ? 2 : 1;
    var cmap = "\x00\x00" + string16(numTables) + "\x00\x03" + "\x00\x01" + (0, _util.string32)(4 + numTables * 8);
    var i, ii, j, jj;

    for (i = ranges.length - 1; i >= 0; --i) {
      if (ranges[i][0] <= 0xffff) {
        break;
      }
    }

    var bmpLength = i + 1;

    if (ranges[i][0] < 0xffff && ranges[i][1] === 0xffff) {
      ranges[i][1] = 0xfffe;
    }

    var trailingRangesCount = ranges[i][1] < 0xffff ? 1 : 0;
    var segCount = bmpLength + trailingRangesCount;
    var searchParams = OpenTypeFileBuilder.getSearchParams(segCount, 2);
    var startCount = "";
    var endCount = "";
    var idDeltas = "";
    var idRangeOffsets = "";
    var glyphsIds = "";
    var bias = 0;
    var range, start, end, codes;

    for (i = 0, ii = bmpLength; i < ii; i++) {
      range = ranges[i];
      start = range[0];
      end = range[1];
      startCount += string16(start);
      endCount += string16(end);
      codes = range[2];
      var contiguous = true;

      for (j = 1, jj = codes.length; j < jj; ++j) {
        if (codes[j] !== codes[j - 1] + 1) {
          contiguous = false;
          break;
        }
      }

      if (!contiguous) {
        var offset = (segCount - i) * 2 + bias * 2;
        bias += end - start + 1;
        idDeltas += string16(0);
        idRangeOffsets += string16(offset);

        for (j = 0, jj = codes.length; j < jj; ++j) {
          glyphsIds += string16(codes[j]);
        }
      } else {
        var startCode = codes[0];
        idDeltas += string16(startCode - start & 0xffff);
        idRangeOffsets += string16(0);
      }
    }

    if (trailingRangesCount > 0) {
      endCount += "\xFF\xFF";
      startCount += "\xFF\xFF";
      idDeltas += "\x00\x01";
      idRangeOffsets += "\x00\x00";
    }

    var format314 = "\x00\x00" + string16(2 * segCount) + string16(searchParams.range) + string16(searchParams.entry) + string16(searchParams.rangeShift) + endCount + "\x00\x00" + startCount + idDeltas + idRangeOffsets + glyphsIds;
    var format31012 = "";
    var header31012 = "";

    if (numTables > 1) {
      cmap += "\x00\x03" + "\x00\x0A" + (0, _util.string32)(4 + numTables * 8 + 4 + format314.length);
      format31012 = "";

      for (i = 0, ii = ranges.length; i < ii; i++) {
        range = ranges[i];
        start = range[0];
        codes = range[2];
        var code = codes[0];

        for (j = 1, jj = codes.length; j < jj; ++j) {
          if (codes[j] !== codes[j - 1] + 1) {
            end = range[0] + j - 1;
            format31012 += (0, _util.string32)(start) + (0, _util.string32)(end) + (0, _util.string32)(code);
            start = end + 1;
            code = codes[j];
          }
        }

        format31012 += (0, _util.string32)(start) + (0, _util.string32)(range[1]) + (0, _util.string32)(code);
      }

      header31012 = "\x00\x0C" + "\x00\x00" + (0, _util.string32)(format31012.length + 16) + "\x00\x00\x00\x00" + (0, _util.string32)(format31012.length / 12);
    }

    return cmap + "\x00\x04" + string16(format314.length + 4) + format314 + header31012 + format31012;
  }