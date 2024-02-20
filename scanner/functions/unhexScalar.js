function unhexScalar(hex) {
      var value = parseInt("0x" + hex, 16);
      if (value > 2147483647) value -= 4294967296;
      return value
    }