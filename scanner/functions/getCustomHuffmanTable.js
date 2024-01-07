function getCustomHuffmanTable(index, referredTo, customTables) {
    let currentIndex = 0;

    for (let i = 0, ii = referredTo.length; i < ii; i++) {
      const table = customTables[referredTo[i]];

      if (table) {
        if (index === currentIndex) {
          return table;
        }

        currentIndex++;
      }
    }

    throw new Jbig2Error("can't find custom Huffman table");
  }