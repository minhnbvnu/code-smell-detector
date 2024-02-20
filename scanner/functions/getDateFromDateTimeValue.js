function getDateFromDateTimeValue(dateTimeValue) {
	return new Date(
		dateTimeValue.year,
		dateTimeValue.month - 1,
		dateTimeValue.day,
		dateTimeValue.hour,
		dateTimeValue.minute,
		0,
		0
	)
}