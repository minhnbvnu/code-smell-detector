function parseJbig2(data) {
    const end = data.length;
    let position = 0;

    if (data[position] !== 0x97 || data[position + 1] !== 0x4a || data[position + 2] !== 0x42 || data[position + 3] !== 0x32 || data[position + 4] !== 0x0d || data[position + 5] !== 0x0a || data[position + 6] !== 0x1a || data[position + 7] !== 0x0a) {
      throw new Jbig2Error("parseJbig2 - invalid header.");
    }

    const header = Object.create(null);
    position += 8;
    const flags = data[position++];
    header.randomAccess = !(flags & 1);

    if (!(flags & 2)) {
      header.numberOfPages = (0, _core_utils.readUint32)(data, position);
      position += 4;
    }

    const segments = readSegments(header, data, position, end);
    const visitor = new SimpleSegmentVisitor();
    processSegments(segments, visitor);
    const {
      width,
      height
    } = visitor.currentPageInfo;
    const bitPacked = visitor.buffer;
    const imgData = new Uint8ClampedArray(width * height);
    let q = 0,
        k = 0;

    for (let i = 0; i < height; i++) {
      let mask = 0,
          buffer;

      for (let j = 0; j < width; j++) {
        if (!mask) {
          mask = 128;
          buffer = bitPacked[k++];
        }

        imgData[q++] = buffer & mask ? 0 : 255;
        mask >>= 1;
      }
    }

    return {
      imgData,
      width,
      height
    };
  }