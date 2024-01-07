function decryptAscii(data, key, discardNumber) {
    const c1 = 52845,
          c2 = 22719;
    let r = key | 0;
    const count = data.length,
          maybeLength = count >>> 1;
    const decrypted = new Uint8Array(maybeLength);
    let i, j;

    for (i = 0, j = 0; i < count; i++) {
      const digit1 = data[i];

      if (!isHexDigit(digit1)) {
        continue;
      }

      i++;
      let digit2;

      while (i < count && !isHexDigit(digit2 = data[i])) {
        i++;
      }

      if (i < count) {
        const value = parseInt(String.fromCharCode(digit1, digit2), 16);
        decrypted[j++] = value ^ r >> 8;
        r = (value + r) * c1 + c2 & (1 << 16) - 1;
      }
    }

    return decrypted.slice(discardNumber, j);
  }