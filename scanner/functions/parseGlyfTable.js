function parseGlyfTable(glyf, loca, isGlyphLocationsLong) {
    var itemSize, itemDecode;
    if (isGlyphLocationsLong) {
      itemSize = 4;
      itemDecode = function fontItemDecodeLong(data, offset) {
        return (data[offset] << 24) | (data[offset + 1] << 16) |
               (data[offset + 2] << 8) | data[offset + 3];
      };
    } else {
      itemSize = 2;
      itemDecode = function fontItemDecode(data, offset) {
        return (data[offset] << 9) | (data[offset + 1] << 1);
      };
    }
    var glyphs = [];
    var startOffset = itemDecode(loca, 0);
    for (var j = itemSize; j < loca.length; j += itemSize) {
      var endOffset = itemDecode(loca, j);
      glyphs.push(glyf.subarray(startOffset, endOffset));
      startOffset = endOffset;
    }
    return glyphs;
  }