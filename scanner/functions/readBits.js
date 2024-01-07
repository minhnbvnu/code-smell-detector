function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;

        if (skipNextBit) {
          buffer = buffer << 7 | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = buffer << 8 | b;
          bufferSize += 8;
        }

        if (b === 0xff) {
          skipNextBit = true;
        }
      }

      bufferSize -= count;
      return buffer >>> bufferSize & (1 << count) - 1;
    }