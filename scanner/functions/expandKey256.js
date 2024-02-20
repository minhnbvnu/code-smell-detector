function expandKey256(cipherKey) {
    var b = 240, result = new Uint8Array(b);
    var r = 1;

    result.set(cipherKey);
    for (var j = 32, i = 1; j < b; ++i) {
      if (j % 32 === 16) {
        t1 = s[t1];
        t2 = s[t2];
        t3 = s[t3];
        t4 = s[t4];
      } else if (j % 32 === 0) {
        // RotWord
        var t1 = result[j - 3], t2 = result[j - 2],
          t3 = result[j - 1], t4 = result[j - 4];
        // SubWord
        t1 = s[t1];
        t2 = s[t2];
        t3 = s[t3];
        t4 = s[t4];
        // Rcon
        t1 = t1 ^ r;
        if ((r <<= 1) >= 256) {
          r = (r ^ 0x1b) & 0xFF;
        }
      }

      for (var n = 0; n < 4; ++n) {
        result[j] = (t1 ^= result[j - 32]);
        j++;
        result[j] = (t2 ^= result[j - 32]);
        j++;
        result[j] = (t3 ^= result[j - 32]);
        j++;
        result[j] = (t4 ^= result[j - 32]);
        j++;
      }
    }
    return result;
  }