function readSupplement() {
        var supplementsCount = bytes[pos++];
        for (i = 0; i < supplementsCount; i++) {
          var code = bytes[pos++];
          var sid = (bytes[pos++] << 8) + (bytes[pos++] & 0xff);
          encoding[code] = charset.indexOf(strings.get(sid));
        }
      }