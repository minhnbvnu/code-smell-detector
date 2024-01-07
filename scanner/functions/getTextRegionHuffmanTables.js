function getTextRegionHuffmanTables(textRegion, referredTo, customTables, numberOfSymbols, reader) {
    const codes = [];

    for (let i = 0; i <= 34; i++) {
      const codeLength = reader.readBits(4);
      codes.push(new HuffmanLine([i, codeLength, 0, 0]));
    }

    const runCodesTable = new HuffmanTable(codes, false);
    codes.length = 0;

    for (let i = 0; i < numberOfSymbols;) {
      const codeLength = runCodesTable.decode(reader);

      if (codeLength >= 32) {
        let repeatedLength, numberOfRepeats, j;

        switch (codeLength) {
          case 32:
            if (i === 0) {
              throw new Jbig2Error("no previous value in symbol ID table");
            }

            numberOfRepeats = reader.readBits(2) + 3;
            repeatedLength = codes[i - 1].prefixLength;
            break;

          case 33:
            numberOfRepeats = reader.readBits(3) + 3;
            repeatedLength = 0;
            break;

          case 34:
            numberOfRepeats = reader.readBits(7) + 11;
            repeatedLength = 0;
            break;

          default:
            throw new Jbig2Error("invalid code length in symbol ID table");
        }

        for (j = 0; j < numberOfRepeats; j++) {
          codes.push(new HuffmanLine([i, repeatedLength, 0, 0]));
          i++;
        }
      } else {
        codes.push(new HuffmanLine([i, codeLength, 0, 0]));
        i++;
      }
    }

    reader.byteAlign();
    const symbolIDTable = new HuffmanTable(codes, false);
    let customIndex = 0,
        tableFirstS,
        tableDeltaS,
        tableDeltaT;

    switch (textRegion.huffmanFS) {
      case 0:
      case 1:
        tableFirstS = getStandardTable(textRegion.huffmanFS + 6);
        break;

      case 3:
        tableFirstS = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error("invalid Huffman FS selector");
    }

    switch (textRegion.huffmanDS) {
      case 0:
      case 1:
      case 2:
        tableDeltaS = getStandardTable(textRegion.huffmanDS + 8);
        break;

      case 3:
        tableDeltaS = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error("invalid Huffman DS selector");
    }

    switch (textRegion.huffmanDT) {
      case 0:
      case 1:
      case 2:
        tableDeltaT = getStandardTable(textRegion.huffmanDT + 11);
        break;

      case 3:
        tableDeltaT = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error("invalid Huffman DT selector");
    }

    if (textRegion.refinement) {
      throw new Jbig2Error("refinement with Huffman is not supported");
    }

    return {
      symbolIDTable,
      tableFirstS,
      tableDeltaS,
      tableDeltaT
    };
  }