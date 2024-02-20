function getFactorForAlarmUnit(unit) {
	switch (unit) {
	case 'seconds':
		return 1

	case 'minutes':
		return 60

	case 'hours':
		return 60 * 60

	case 'days':
		return 24 * 60 * 60

	case 'weeks':
		return 7 * 24 * 60 * 60

	default:
		return 1
	}
}