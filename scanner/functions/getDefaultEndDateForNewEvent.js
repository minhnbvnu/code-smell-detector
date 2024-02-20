function getDefaultEndDateForNewEvent() {
	// When we have a setting for default event duration,
	// this needs to be taken into consideration here
	const start = getDefaultStartDateForNewEvent()
	const end = new Date(Number(start) * 1000)
	end.setHours(end.getHours() + 1)

	return String(getUnixTimestampFromDate(end))
}