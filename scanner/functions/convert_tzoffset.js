function convert_tzoffset(offset) {
      return offset.factor * (offset.hours * 3600 + offset.minutes * 60);
    }