function readUncompressedBitmap(reader, width, height) {
    const bitmap = [];

    for (let y = 0; y < height; y++) {
      const row = new Uint8Array(width);
      bitmap.push(row);

      for (let x = 0; x < width; x++) {
        row[x] = reader.readBit();
      }

      reader.byteAlign();
    }

    return bitmap;
  }