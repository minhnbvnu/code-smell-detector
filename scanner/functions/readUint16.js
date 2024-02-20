function readUint16() {
        var value = (data[offset] << 8) | data[offset + 1];
        offset += 2;
        return value;
      }