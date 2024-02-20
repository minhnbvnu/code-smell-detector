function getDurationValueFromFullCalendarDuration(fcDuration) {
	switch (typeof fcDuration) {
	case 'object':
		return getDurationValueFromFullCalendarDurationEncodedAsObject(fcDuration)

	case 'string':
		return getDurationValueFromFullCalendarDurationEncodedAsString(fcDuration)

	case 'number':
		return getDurationValueFromFullCalendarDurationEncodedAsNumber(fcDuration)

	default:
		return null
	}
}