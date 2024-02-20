function getTranslatedMonths(byMonthList) {
	const sortedByMonth = byMonthList.slice().map((n) => parseInt(n, 10))
	sortedByMonth.sort((a, b) => a - b)

	const monthNames = []
	const allMonthNames = getMonthNames()

	for (const month of sortedByMonth) {
		monthNames.push(allMonthNames[month - 1])
	}

	return monthNames.join(', ')
}