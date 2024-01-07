function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }

      if (readBits(1) === 0) {
        return 2;
      }

      var value = readBits(2);

      if (value < 3) {
        return value + 3;
      }

      value = readBits(5);

      if (value < 31) {
        return value + 6;
      }

      value = readBits(7);
      return value + 37;
    }