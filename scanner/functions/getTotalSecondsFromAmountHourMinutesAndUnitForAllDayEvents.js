function getTotalSecondsFromAmountHourMinutesAndUnitForAllDayEvents(amount, hours, minutes, unit) {
	if (unit === 'weeks') {
		amount *= 7
		unit = 'days'
	}

	// 0 is on the same day of the all-day event => positive
	// 1 ... n before the event is negative
	const isNegative = amount > 0

	if (isNegative) {
		// If it's negative, we need to subtract one day
		amount--
		// Convert days to seconds
		amount *= getFactorForAlarmUnit(unit)

		let invertedHours = 24 - hours
		let invertedMinutes = 0

		if (minutes !== 0) {
			invertedHours--
			invertedMinutes = 60 - minutes
		}

		amount += (invertedHours * getFactorForAlarmUnit('hours'))
		amount += (invertedMinutes * getFactorForAlarmUnit('minutes'))

		amount *= -1
	} else {
		// Convert days to seconds
		amount *= getFactorForAlarmUnit('days')

		amount += (hours * getFactorForAlarmUnit('hours'))
		amount += (minutes * getFactorForAlarmUnit('minutes'))
	}

	return amount
}