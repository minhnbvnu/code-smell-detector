function getRanges(glyphs, numGlyphs) {
    var codes = [];

    for (var charCode in glyphs) {
      if (glyphs[charCode] >= numGlyphs) {
        continue;
      }

      codes.push({
        fontCharCode: charCode | 0,
        glyphId: glyphs[charCode]
      });
    }

    if (codes.length === 0) {
      codes.push({
        fontCharCode: 0,
        glyphId: 0
      });
    }

    codes.sort(function fontGetRangesSort(a, b) {
      return a.fontCharCode - b.fontCharCode;
    });
    var ranges = [];
    var length = codes.length;

    for (var n = 0; n < length;) {
      var start = codes[n].fontCharCode;
      var codeIndices = [codes[n].glyphId];
      ++n;
      var end = start;

      while (n < length && end + 1 === codes[n].fontCharCode) {
        codeIndices.push(codes[n].glyphId);
        ++end;
        ++n;

        if (end === 0xffff) {
          break;
        }
      }

      ranges.push([start, end, codeIndices]);
    }

    return ranges;
  }