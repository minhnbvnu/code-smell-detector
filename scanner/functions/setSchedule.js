function setSchedule(schedule) {
  	var sched, recur, recurStr, startTime;

  if (schedule && app.helper.isObject(schedule) && Object.keys(schedule)) {
  	recurStr = schedule.recurrencePattern;

    if (!schedule.startDateTime.trim()) {
      schedule.startDateTime = app.moment().format();
    }

  	// FuelBox UI tacks on trailing semicolon, which breaks ability for rrecurjs to create() an iterable object.
  	recurStr = (recurStr.charAt(recurStr.length-1) == ';') ? recurStr.slice(0,-1) : recurStr;

    startTime = removeOffset(schedule.startDateTime);

    sched = {
      dtstart: {
       zoneless: startTime,
       locale: schedule.timeZone.offset
      },
      rrule: Rrecur.parse(recurStr)
     };

    schedule['sched'] = sched;

    recur = Rrecur.create(sched, schedule.startTime, schedule.timeZone.offset);
    schedule['nextTimeToRun'] = moment(recur.next()).unix() * 1000;

    return schedule;
  }
}