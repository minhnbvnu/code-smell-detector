function shortenTime(str) {
    if (NVR.getLogin().useLocalTimeZone)
      return moment.tz(str, NVR.getTimeZoneNow()).tz(moment.tz.guess()).format(NVR.getTimeFormat());
    else
      return moment(str).format(NVR.getTimeFormat());
  }