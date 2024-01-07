function readTableEntry(file) {
        var tag = (0, _util.bytesToString)(file.getBytes(4));
        var checksum = file.getInt32() >>> 0;
        var offset = file.getInt32() >>> 0;
        var length = file.getInt32() >>> 0;
        var previousPosition = file.pos;
        file.pos = file.start ? file.start : 0;
        file.skip(offset);
        var data = file.getBytes(length);
        file.pos = previousPosition;

        if (tag === "head") {
          data[8] = data[9] = data[10] = data[11] = 0;
          data[17] |= 0x20;
        }

        return {
          tag,
          checksum,
          length,
          offset,
          data
        };
      }