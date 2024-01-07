function safeString16(value) {
    if (value > 0x7fff) {
      value = 0x7fff;
    } else if (value < -0x8000) {
      value = -0x8000;
    }

    return String.fromCharCode(value >> 8 & 0xff, value & 0xff);
  }