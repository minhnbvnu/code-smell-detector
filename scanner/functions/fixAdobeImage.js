function fixAdobeImage(bytes) {
    // Inserting 'EMBED' marker after JPEG signature
    var embedMarker = new Uint8Array([0xFF, 0xEC, 0, 8, 0x45, 0x4D, 0x42, 0x45,
                                      0x44, 0]);
    var newBytes = new Uint8Array(bytes.length + embedMarker.length);
    newBytes.set(bytes, embedMarker.length);
    // copy JPEG header
    newBytes[0] = bytes[0];
    newBytes[1] = bytes[1];
    newBytes.set(embedMarker, 2);
    return newBytes;
  }