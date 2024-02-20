function prettifyDate(str) {
      if (NVR.getLogin().useLocalTimeZone)
        return moment.tz(str, NVR.getTimeZoneNow()).tz(moment.tz.guess()).format('MMM Do');
      else
        return moment(str).format('MMM Do');
    }