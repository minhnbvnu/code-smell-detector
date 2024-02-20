function expandKey128(cipherKey) {
    var b = 176, result = new Uint8Array(b);
    result.set(cipherKey);
    for (var j = 16, i = 1; j < b; ++i) {
      // RotWord
      var t1 = result[j - 3], t2 = result[j - 2],
          t3 = result[j - 1], t4 = result[j - 4];
      // SubWord
      t1 = s[t1];
      t2 = s[t2];
      t3 = s[t3];
      t4 = s[t4];
      // Rcon
      t1 = t1 ^ rcon[i];
      for (var n = 0; n < 4; ++n) {
        result[j] = (t1 ^= result[j - 16]);
        j++;
        result[j] = (t2 ^= result[j - 16]);
        j++;
        result[j] = (t3 ^= result[j - 16]);
        j++;
        result[j] = (t4 ^= result[j - 16]);
        j++;
      }
    }
    return result;
  }