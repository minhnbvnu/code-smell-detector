function getInnerRange(loc, offset, length) {
    const source = loc.source.slice(offset, offset + length);
    const newLoc = {
      source,
      start: advancePositionWithClone(loc.start, loc.source, offset),
      end: loc.end
    };
    if (length != null) {
      newLoc.end = advancePositionWithClone(
        loc.start,
        loc.source,
        offset + length
      );
    }
    return newLoc;
  }