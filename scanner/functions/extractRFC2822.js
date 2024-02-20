function extractRFC2822(match) {
    var weekdayStr = match[1],
        dayStr = match[2],
        monthStr = match[3],
        yearStr = match[4],
        hourStr = match[5],
        minuteStr = match[6],
        secondStr = match[7],
        obsOffset = match[8],
        milOffset = match[9],
        offHourStr = match[10],
        offMinuteStr = match[11],
        result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    var offset;

    if (obsOffset) {
      offset = obsOffsets[obsOffset];
    } else if (milOffset) {
      offset = 0;
    } else {
      offset = signedOffset(offHourStr, offMinuteStr);
    }

    return [result, new FixedOffsetZone(offset)];
  }