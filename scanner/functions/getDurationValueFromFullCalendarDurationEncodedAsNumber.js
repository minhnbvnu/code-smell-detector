function getDurationValueFromFullCalendarDurationEncodedAsNumber(fcDuration) {
	return DurationValue.fromSeconds(Math.floor(fcDuration / 1000))
}