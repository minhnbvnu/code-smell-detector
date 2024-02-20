function Marsaglia(i1, i2) {
      var z = i1 || 362436069,
        w = i2 || 521288629;
      var nextInt = function() {
        z = 36969 * (z & 65535) + (z >>> 16) & 4294967295;
        w = 18E3 * (w & 65535) + (w >>> 16) & 4294967295;
        return ((z & 65535) << 16 | w & 65535) & 4294967295
      };
      this.nextDouble = function() {
        var i = nextInt() / 4294967296;
        return i < 0 ? 1 + i : i
      };
      this.nextInt = nextInt
    }