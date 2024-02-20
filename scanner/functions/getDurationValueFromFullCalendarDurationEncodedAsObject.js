function getDurationValueFromFullCalendarDurationEncodedAsObject(fcDuration) {
	if (fcDuration.year || fcDuration.years || fcDuration.month || fcDuration.months) {
		return null
	}

	const durations = []
	if (fcDuration.days) {
		durations.push(DurationValue.fromData({
			days: fcDuration.days,
		}))
	}
	if (fcDuration.day) {
		durations.push(DurationValue.fromData({
			days: fcDuration.day,
		}))
	}
	if (fcDuration.minutes) {
		durations.push(DurationValue.fromData({
			minutes: fcDuration.minutes,
		}))
	}
	if (fcDuration.minute) {
		durations.push(DurationValue.fromData({
			minutes: fcDuration.minute,
		}))
	}
	if (fcDuration.seconds) {
		durations.push(DurationValue.fromData({
			seconds: fcDuration.seconds,
		}))
	}
	if (fcDuration.second) {
		durations.push(DurationValue.fromData({
			seconds: fcDuration.second,
		}))
	}
	if (fcDuration.milliseconds) {
		durations.push(DurationValue.fromData({
			seconds: Math.floor(fcDuration.milliseconds / 1000),
		}))
	}
	if (fcDuration.millisecond) {
		durations.push(DurationValue.fromData({
			seconds: Math.floor(fcDuration.millisecond / 1000),
		}))
	}
	if (fcDuration.ms) {
		durations.push(DurationValue.fromData({
			seconds: Math.floor(fcDuration.ms / 1000),
		}))
	}

	const duration = DurationValue.fromSeconds(0)
	for (const d of durations) {
		duration.addDuration(d)
	}

	return duration
}