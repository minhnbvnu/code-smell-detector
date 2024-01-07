function parseGlyfTable(glyf, loca, isGlyphLocationsLong) {
    let itemSize, itemDecode;

    if (isGlyphLocationsLong) {
      itemSize = 4;

      itemDecode = function fontItemDecodeLong(data, offset) {
        return data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3];
      };
    } else {
      itemSize = 2;

      itemDecode = function fontItemDecode(data, offset) {
        return data[offset] << 9 | data[offset + 1] << 1;
      };
    }

    const glyphs = [];
    let startOffset = itemDecode(loca, 0);

    for (let j = itemSize; j < loca.length; j += itemSize) {
      const endOffset = itemDecode(loca, j);
      glyphs.push(glyf.subarray(startOffset, endOffset));
      startOffset = endOffset;
    }

    return glyphs;
  }