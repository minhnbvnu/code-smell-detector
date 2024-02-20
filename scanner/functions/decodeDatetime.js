function decodeDatetime(dateStr) {
	const matches = DATETIME_RE.exec(dateStr);
	if (!matches) {
		return decodeDate(dateStr);
	}
	const isBC = BC_RE.test(dateStr);
	const year = parseInt(matches[1], 10) * (isBC ? -1 : 1);
	const month = parseInt(matches[2], 10) - 1;
	const day = parseInt(matches[3], 10);
	const hour = parseInt(matches[4], 10);
	const minute = parseInt(matches[5], 10);
	const second = parseInt(matches[6], 10);
	const msMatch = matches[7];
	const ms = msMatch ? 1000 * parseFloat(msMatch) : 0;
	let date;
	const offset = decodeTimezoneOffset(dateStr);
	if (offset === null) {
		date = new Date(year, month, day, hour, minute, second, ms);
	} else {
		const utc = Date.UTC(year, month, day, hour, minute, second, ms);
		date = new Date(utc + offset);
	}
	date.setUTCFullYear(year);
	return date;
}