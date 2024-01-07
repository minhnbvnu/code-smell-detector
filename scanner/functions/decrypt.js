function decrypt(data, key, discardNumber) {
    if (discardNumber >= data.length) {
      return new Uint8Array(0);
    }

    const c1 = 52845,
          c2 = 22719;
    let r = key | 0,
        i,
        j;

    for (i = 0; i < discardNumber; i++) {
      r = (data[i] + r) * c1 + c2 & (1 << 16) - 1;
    }

    const count = data.length - discardNumber;
    const decrypted = new Uint8Array(count);

    for (i = discardNumber, j = 0; j < count; i++, j++) {
      const value = data[i];
      decrypted[j] = value ^ r >> 8;
      r = (value + r) * c1 + c2 & (1 << 16) - 1;
    }

    return decrypted;
  }