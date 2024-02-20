function signedOffset(offHourStr, offMinuteStr) {
    var offHour = parseInt(offHourStr, 10); // don't || this because we want to preserve -0

    if (Number.isNaN(offHour)) {
      offHour = 0;
    }

    var offMin = parseInt(offMinuteStr, 10) || 0,
        offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
    return offHour * 60 + offMinSigned;
  }