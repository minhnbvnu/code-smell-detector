function prettifyTimeSec(str) {
    if (NVR.getLogin().useLocalTimeZone)
      return moment.tz(str, NVR.getTimeZoneNow()).tz(moment.tz.guess()).format(NVR.getTimeFormatSec());
    else
      return moment(str).format(NVR.getTimeFormatSec());
  }