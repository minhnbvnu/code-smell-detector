function decodeHalftoneRegion(mmr, patterns, template, regionWidth, regionHeight, defaultPixelValue, enableSkip, combinationOperator, gridWidth, gridHeight, gridOffsetX, gridOffsetY, gridVectorX, gridVectorY, decodingContext) {
    const skip = null;

    if (enableSkip) {
      throw new Jbig2Error("skip is not supported");
    }

    if (combinationOperator !== 0) {
      throw new Jbig2Error("operator " + combinationOperator + " is not supported in halftone region");
    }

    const regionBitmap = [];
    let i, j, row;

    for (i = 0; i < regionHeight; i++) {
      row = new Uint8Array(regionWidth);

      if (defaultPixelValue) {
        for (j = 0; j < regionWidth; j++) {
          row[j] = defaultPixelValue;
        }
      }

      regionBitmap.push(row);
    }

    const numberOfPatterns = patterns.length;
    const pattern0 = patterns[0];
    const patternWidth = pattern0[0].length,
          patternHeight = pattern0.length;
    const bitsPerValue = (0, _core_utils.log2)(numberOfPatterns);
    const at = [];

    if (!mmr) {
      at.push({
        x: template <= 1 ? 3 : 2,
        y: -1
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

    const grayScaleBitPlanes = [];
    let mmrInput, bitmap;

    if (mmr) {
      mmrInput = new Reader(decodingContext.data, decodingContext.start, decodingContext.end);
    }

    for (i = bitsPerValue - 1; i >= 0; i--) {
      if (mmr) {
        bitmap = decodeMMRBitmap(mmrInput, gridWidth, gridHeight, true);
      } else {
        bitmap = decodeBitmap(false, gridWidth, gridHeight, template, false, skip, at, decodingContext);
      }

      grayScaleBitPlanes[i] = bitmap;
    }

    let mg, ng, bit, patternIndex, patternBitmap, x, y, patternRow, regionRow;

    for (mg = 0; mg < gridHeight; mg++) {
      for (ng = 0; ng < gridWidth; ng++) {
        bit = 0;
        patternIndex = 0;

        for (j = bitsPerValue - 1; j >= 0; j--) {
          bit = grayScaleBitPlanes[j][mg][ng] ^ bit;
          patternIndex |= bit << j;
        }

        patternBitmap = patterns[patternIndex];
        x = gridOffsetX + mg * gridVectorY + ng * gridVectorX >> 8;
        y = gridOffsetY + mg * gridVectorX - ng * gridVectorY >> 8;

        if (x >= 0 && x + patternWidth <= regionWidth && y >= 0 && y + patternHeight <= regionHeight) {
          for (i = 0; i < patternHeight; i++) {
            regionRow = regionBitmap[y + i];
            patternRow = patternBitmap[i];

            for (j = 0; j < patternWidth; j++) {
              regionRow[x + j] |= patternRow[j];
            }
          }
        } else {
          let regionX, regionY;

          for (i = 0; i < patternHeight; i++) {
            regionY = y + i;

            if (regionY < 0 || regionY >= regionHeight) {
              continue;
            }

            regionRow = regionBitmap[regionY];
            patternRow = patternBitmap[i];

            for (j = 0; j < patternWidth; j++) {
              regionX = x + j;

              if (regionX >= 0 && regionX < regionWidth) {
                regionRow[regionX] |= patternRow[j];
              }
            }
          }
        }
      }
    }

    return regionBitmap;
  }