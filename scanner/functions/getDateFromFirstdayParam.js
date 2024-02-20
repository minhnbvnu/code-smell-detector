function getDateFromFirstdayParam(firstDayParam) {
	if (firstDayParam === 'now') {
		return dateFactory()
	}

	const [year, month, date] = firstDayParam.split('-')
		.map((str) => parseInt(str, 10))

	if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(date)) {
		logger.error('First day parameter contains non-numerical components, falling back to today')
		return dateFactory()
	}

	const dateObject = dateFactory()
	dateObject.setFullYear(year, month - 1, date)
	dateObject.setHours(0, 0, 0, 0)

	return dateObject
}