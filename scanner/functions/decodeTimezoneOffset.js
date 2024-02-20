function decodeTimezoneOffset(dateStr) {
	const timeStr = dateStr.split(' ')[1];
	const matches = TIMEZONE_RE.exec(timeStr);
	if (!matches) {
		return null;
	}
	const type = matches[1];
	if (type === 'Z') {
		return 0;
	}
	const sign = type === '-' ? 1 : -1;
	const hours = parseInt(matches[2], 10);
	const minutes = parseInt(matches[3] || '0', 10);
	const seconds = parseInt(matches[4] || '0', 10);
	const offset = hours * 3600 + minutes * 60 + seconds;
	return sign * offset * 1000;
}