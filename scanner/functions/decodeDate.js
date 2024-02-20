function decodeDate(dateStr) {
	if (dateStr === 'infinity') {
		return Number(Infinity);
	} else if (dateStr === '-infinity') {
		return Number(-Infinity);
	}
	const matches = DATE_RE.exec(dateStr);
	if (!matches) {
		throw new Error(`"${dateStr}" could not be parsed to date`);
	}
	const year = parseInt(matches[1], 10);
	const month = parseInt(matches[2], 10) - 1;
	const day = parseInt(matches[3], 10);
	const date = new Date(year, month, day);
	date.setUTCFullYear(year);
	return date;
}