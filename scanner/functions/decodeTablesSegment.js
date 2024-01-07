function decodeTablesSegment(data, start, end) {
    const flags = data[start];
    const lowestValue = (0, _core_utils.readUint32)(data, start + 1) & 0xffffffff;
    const highestValue = (0, _core_utils.readUint32)(data, start + 5) & 0xffffffff;
    const reader = new Reader(data, start + 9, end);
    const prefixSizeBits = (flags >> 1 & 7) + 1;
    const rangeSizeBits = (flags >> 4 & 7) + 1;
    const lines = [];
    let prefixLength,
        rangeLength,
        currentRangeLow = lowestValue;

    do {
      prefixLength = reader.readBits(prefixSizeBits);
      rangeLength = reader.readBits(rangeSizeBits);
      lines.push(new HuffmanLine([currentRangeLow, prefixLength, rangeLength, 0]));
      currentRangeLow += 1 << rangeLength;
    } while (currentRangeLow < highestValue);

    prefixLength = reader.readBits(prefixSizeBits);
    lines.push(new HuffmanLine([lowestValue - 1, prefixLength, 32, 0, "lower"]));
    prefixLength = reader.readBits(prefixSizeBits);
    lines.push(new HuffmanLine([highestValue, prefixLength, 32, 0]));

    if (flags & 1) {
      prefixLength = reader.readBits(prefixSizeBits);
      lines.push(new HuffmanLine([prefixLength, 0]));
    }

    return new HuffmanTable(lines, false);
  }