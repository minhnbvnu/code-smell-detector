function getBySetPositionAndBySetFromDate(jsDate) {
	const byDay = getWeekDayFromDate(jsDate)
	let bySetPosition = 1
	let dayOfMonth = jsDate.getDate()
	for (; dayOfMonth > 7; dayOfMonth -= 7) {
		bySetPosition++
	}

	return {
		byDay,
		bySetPosition,
	}
}