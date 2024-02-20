function getWeekDayFromDate(jsDate) {
	switch (jsDate.getDay()) {
	case 0:
		return 'SU'
	case 1:
		return 'MO'
	case 2:
		return 'TU'
	case 3:
		return 'WE'
	case 4:
		return 'TH'
	case 5:
		return 'FR'
	case 6:
		return 'SA'
	default:
		throw TypeError('Invalid date-object given')
	}
}