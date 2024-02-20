function extractISOOffset(match, cursor) {
    var local = !match[cursor] && !match[cursor + 1],
        fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
        zone = local ? null : FixedOffsetZone.instance(fullOffset);
    return [{}, zone, cursor + 3];
  }