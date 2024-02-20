function decodeRGB565(rgb565, target = [0, 0, 0]) {
    const r5 = rgb565 >> 11 & 31;
    const g6 = rgb565 >> 5 & 63;
    const b5 = rgb565 & 31;
    target[0] = r5 << 3;
    target[1] = g6 << 2;
    target[2] = b5 << 3;
    return target;
  }