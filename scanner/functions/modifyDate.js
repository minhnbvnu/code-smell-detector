function modifyDate(date, { day = 0, week = 0, month = 0, year = 0 }) {
	date = new Date(date.getTime())
	date.setDate(date.getDate() + day)
	date.setDate(date.getDate() + week * 7)
	date.setMonth(date.getMonth() + month)
	date.setFullYear(date.getFullYear() + year)

	return date
}