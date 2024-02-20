function humanizeTime(str) {
    return moment.tz(str, NVR.getTimeZoneNow()).fromNow();

  }