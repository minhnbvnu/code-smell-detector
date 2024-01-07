function parseCmap(data, start, end) {
    const offset = getUshort(data, start + 2) === 1 ? getLong(data, start + 8) : getLong(data, start + 16);
    const format = getUshort(data, start + offset);
    let ranges, p, i;

    if (format === 4) {
      getUshort(data, start + offset + 2);
      const segCount = getUshort(data, start + offset + 6) >> 1;
      p = start + offset + 14;
      ranges = [];

      for (i = 0; i < segCount; i++, p += 2) {
        ranges[i] = {
          end: getUshort(data, p)
        };
      }

      p += 2;

      for (i = 0; i < segCount; i++, p += 2) {
        ranges[i].start = getUshort(data, p);
      }

      for (i = 0; i < segCount; i++, p += 2) {
        ranges[i].idDelta = getUshort(data, p);
      }

      for (i = 0; i < segCount; i++, p += 2) {
        let idOffset = getUshort(data, p);

        if (idOffset === 0) {
          continue;
        }

        ranges[i].ids = [];

        for (let j = 0, jj = ranges[i].end - ranges[i].start + 1; j < jj; j++) {
          ranges[i].ids[j] = getUshort(data, p + idOffset);
          idOffset += 2;
        }
      }

      return ranges;
    } else if (format === 12) {
      getLong(data, start + offset + 4);
      const groups = getLong(data, start + offset + 12);
      p = start + offset + 16;
      ranges = [];

      for (i = 0; i < groups; i++) {
        ranges.push({
          start: getLong(data, p),
          end: getLong(data, p + 4),
          idDelta: getLong(data, p + 8) - getLong(data, p)
        });
        p += 12;
      }

      return ranges;
    }

    throw new _util.FormatError(`unsupported cmap: ${format}`);
  }