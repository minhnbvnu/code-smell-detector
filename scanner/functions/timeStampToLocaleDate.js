function timeStampToLocaleDate(timeStamp, timeZoneId) {
	return (new Date(timeStamp * 1000)).toLocaleDateString(locale, {
		timeZone: timeZoneId,
	})
}