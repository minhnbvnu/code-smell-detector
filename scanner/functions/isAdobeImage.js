function isAdobeImage(bytes) {
    var maxBytesScanned = Math.max(bytes.length - 16, 1024);
    // Looking for APP14, 'Adobe'
    for (var i = 0; i < maxBytesScanned; ++i) {
      if (bytes[i] == 0xFF && bytes[i + 1] == 0xEE &&
          bytes[i + 2] == 0x00 && bytes[i + 3] == 0x0E &&
          bytes[i + 4] == 0x41 && bytes[i + 5] == 0x64 &&
          bytes[i + 6] == 0x6F && bytes[i + 7] == 0x62 &&
          bytes[i + 8] == 0x65 && bytes[i + 9] == 0x00)
          return true;
      // scanning until frame tag
      if (bytes[i] == 0xFF && bytes[i + 1] == 0xC0)
        break;
    }
    return false;
  }