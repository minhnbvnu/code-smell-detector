function getDefaultStartDateForNewEvent() {
	const start = dateFactory()
	start.setHours(start.getHours() + Math.ceil(start.getMinutes() / 60))
	start.setMinutes(0)

	return String(getUnixTimestampFromDate(start))
}