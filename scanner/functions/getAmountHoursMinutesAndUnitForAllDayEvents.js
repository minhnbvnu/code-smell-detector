function getAmountHoursMinutesAndUnitForAllDayEvents(totalSeconds) {
	const dayFactor = getFactorForAlarmUnit('days')
	const hourFactor = getFactorForAlarmUnit('hours')
	const minuteFactor = getFactorForAlarmUnit('minutes')
	const isNegative = totalSeconds < 0
	totalSeconds = Math.abs(totalSeconds)

	let dayPart = Math.floor(totalSeconds / dayFactor)
	const hourPart = totalSeconds % dayFactor

	if (hourPart !== 0) {
		if (isNegative) {
			dayPart++
		}
	}

	let amount = 0
	let unit = null
	if (dayPart === 0) {
		unit = 'days'
	} else if (dayPart % 7 === 0) {
		amount = dayPart / 7
		unit = 'weeks'
	} else {
		amount = dayPart
		unit = 'days'
	}

	let hours = Math.floor(hourPart / hourFactor)
	const minutePart = hourPart % hourFactor
	let minutes = Math.floor(minutePart / minuteFactor)

	if (isNegative) {
		hours = 24 - hours

		if (minutes !== 0) {
			hours--
			minutes = 60 - minutes
		}
	}

	return {
		amount,
		unit,
		hours,
		minutes,
	}
}