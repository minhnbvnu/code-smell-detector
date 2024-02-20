function findEmptyGlyphs(locaTable, isGlyphLocationsLong, emptyGlyphIds) {
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
        var data = locaTable.data, length = data.length;
        var lastOffset = itemDecode(data, 0);
        for (var i = itemSize, j = 0; i < length; i += itemSize, j++) {
          var offset = itemDecode(data, i);
          if (offset == lastOffset)
            emptyGlyphIds[j] = true;
          lastOffset = offset;
        }
      }