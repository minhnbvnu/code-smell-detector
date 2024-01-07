function decodePatternDictionary(mmr, patternWidth, patternHeight, maxPatternIndex, template, decodingContext) {
    const at = [];

    if (!mmr) {
      at.push({
        x: -patternWidth,
        y: 0
      });

      if (template === 0) {
        at.push({
          x: -3,
          y: -1
        });
        at.push({
          x: 2,
          y: -2
        });
        at.push({
          x: -2,
          y: -2
        });
      }
    }

    const collectiveWidth = (maxPatternIndex + 1) * patternWidth;
    const collectiveBitmap = decodeBitmap(mmr, collectiveWidth, patternHeight, template, false, null, at, decodingContext);
    const patterns = [];

    for (let i = 0; i <= maxPatternIndex; i++) {
      const patternBitmap = [];
      const xMin = patternWidth * i;
      const xMax = xMin + patternWidth;

      for (let y = 0; y < patternHeight; y++) {
        patternBitmap.push(collectiveBitmap[y].subarray(xMin, xMax));
      }

      patterns.push(patternBitmap);
    }

    return patterns;
  }