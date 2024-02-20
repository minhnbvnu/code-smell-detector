function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i2 = 0; i2 < bytes.byteLength; i2++) {
      binary += String.fromCharCode(bytes[i2]);
    }
    return btoa(binary);
  }