function getTotalSecondsFromAmountAndUnitForTimedEvents(amount, unit, isBefore = true) {
	return amount * getFactorForAlarmUnit(unit) * (isBefore ? -1 : 1)
}