function decodeMMRBitmap(input, width, height, endOfBlock) {
    const params = {
      K: -1,
      Columns: width,
      Rows: height,
      BlackIs1: true,
      EndOfBlock: endOfBlock
    };
    const decoder = new _ccitt.CCITTFaxDecoder(input, params);
    const bitmap = [];
    let currentByte,
        eof = false;

    for (let y = 0; y < height; y++) {
      const row = new Uint8Array(width);
      bitmap.push(row);
      let shift = -1;

      for (let x = 0; x < width; x++) {
        if (shift < 0) {
          currentByte = decoder.readNextChar();

          if (currentByte === -1) {
            currentByte = 0;
            eof = true;
          }

          shift = 7;
        }

        row[x] = currentByte >> shift & 1;
        shift--;
      }
    }

    if (endOfBlock && !eof) {
      const lookForEOFLimit = 5;

      for (let i = 0; i < lookForEOFLimit; i++) {
        if (decoder.readNextChar() === -1) {
          break;
        }
      }
    }

    return bitmap;
  }