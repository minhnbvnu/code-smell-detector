function ReadUint(data, offset, bytes) {
        var n = 0;
        for (var i = 0; i < bytes; i++)
          n = n * 256 + (data[offset + i] & 0xFF);
        return n;
      }