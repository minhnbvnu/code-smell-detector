function getDurationValueFromFullCalendarDurationEncodedAsString(fcDuration) {
	const match1 = fcDuration.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})/)
	if (match1) {
		const [, hours, minutes, seconds] = match1

		return DurationValue.fromData({
			hours: parseInt(hours, 10),
			minutes: parseInt(minutes, 10),
			seconds: parseInt(seconds, 10),
		})
	}

	const match2 = fcDuration.match(/(\d{2}):(\d{2}):(\d{2})/)
	if (match2) {
		const [, hours, minutes, seconds] = match2

		return DurationValue.fromData({
			hours: parseInt(hours, 10),
			minutes: parseInt(minutes, 10),
			seconds: parseInt(seconds, 10),
		})
	}

	const match3 = fcDuration.match(/(\d{2}):(\d{2})/)
	if (match3) {
		const [, hours, minutes] = match3

		return DurationValue.fromData({
			hours: parseInt(hours, 10),
			minutes: parseInt(minutes, 10),
		})
	}

	return null
}