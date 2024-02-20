function CompoundGlyph(raw, xMin, yMin, xMax, yMax) {
    var data, flags;
    this.raw = raw;
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.compound = true;
    this.glyphIDs = [];
    this.glyphOffsets = [];
    data = this.raw;
    while (true) {
      flags = data.readShort();
      this.glyphOffsets.push(data.pos);
      this.glyphIDs.push(data.readUInt16());
      if (!(flags & MORE_COMPONENTS)) {
        break;
      }
      if (flags & ARG_1_AND_2_ARE_WORDS) {
        data.pos += 4;
      } else {
        data.pos += 2;
      }
      if (flags & WE_HAVE_A_TWO_BY_TWO) {
        data.pos += 8;
      } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
        data.pos += 4;
      } else if (flags & WE_HAVE_A_SCALE) {
        data.pos += 2;
      }
    }
  }