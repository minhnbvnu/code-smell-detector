function timeStampToLocaleTime(timeStamp, timeZoneId) {
	return (new Date(timeStamp * 1000)).toLocaleString(locale, {
		timeZone: timeZoneId,
		hour: 'numeric',
		minute: 'numeric',
	})
}