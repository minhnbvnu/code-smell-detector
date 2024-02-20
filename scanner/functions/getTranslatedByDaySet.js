function getTranslatedByDaySet(byDayList) {
	const byDayNames = []
	const allByDayNames = getDayNames()

	// TODO: This should be sorted by first day of week
	// TODO: This should summarise:
	//  - SA, SU to weekend
	//  - MO, TU, WE, TH, FR to weekday
	//  - MO, TU, WE, TH, FR, SA, SU to day

	if (byDayList.includes('MO')) {
		byDayNames.push(allByDayNames[1])
	}
	if (byDayList.includes('TU')) {
		byDayNames.push(allByDayNames[2])
	}
	if (byDayList.includes('WE')) {
		byDayNames.push(allByDayNames[3])
	}
	if (byDayList.includes('TH')) {
		byDayNames.push(allByDayNames[4])
	}
	if (byDayList.includes('FR')) {
		byDayNames.push(allByDayNames[5])
	}
	if (byDayList.includes('SA')) {
		byDayNames.push(allByDayNames[6])
	}
	if (byDayList.includes('SU')) {
		byDayNames.push(allByDayNames[0])
	}

	return byDayNames.join(', ')
}