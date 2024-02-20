function decToBin(value, numBitsInValue) {
      var mask = 1;
      mask = mask << (numBitsInValue - 1);

      var str = "";
      for (var i = 0; i < numBitsInValue; i++) {
        str += (mask & value) ? "1" : "0";
        mask = mask >>> 1;
      }
      return str;
    }