function readSupplement() {
        const supplementsCount = bytes[pos++];

        for (i = 0; i < supplementsCount; i++) {
          const code = bytes[pos++];
          const sid = (bytes[pos++] << 8) + (bytes[pos++] & 0xff);
          encoding[code] = charset.indexOf(strings.get(sid));
        }
      }