function lookupCmap(ranges, unicode) {
    const code = unicode.codePointAt(0);
    let gid = 0,
        l = 0,
        r = ranges.length - 1;

    while (l < r) {
      const c = l + r + 1 >> 1;

      if (code < ranges[c].start) {
        r = c - 1;
      } else {
        l = c;
      }
    }

    if (ranges[l].start <= code && code <= ranges[l].end) {
      gid = ranges[l].idDelta + (ranges[l].ids ? ranges[l].ids[code - ranges[l].start] : code) & 0xffff;
    }

    return {
      charCode: code,
      glyphId: gid
    };
  }