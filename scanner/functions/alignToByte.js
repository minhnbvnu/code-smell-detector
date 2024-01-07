function alignToByte() {
      bufferSize = 0;

      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }