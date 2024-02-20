function encodeDate(date) {
	const year = pad(date.getFullYear(), 4);
	const month = pad(date.getMonth() + 1, 2);
	const day = pad(date.getDate(), 2);
	const hour = pad(date.getHours(), 2);
	const min = pad(date.getMinutes(), 2);
	const sec = pad(date.getSeconds(), 2);
	const ms = pad(date.getMilliseconds(), 3);
	const encodedDate = `${year}-${month}-${day}T${hour}:${min}:${sec}.${ms}`;
	const offset = date.getTimezoneOffset();
	const tzSign = offset > 0 ? '-' : '+';
	const absOffset = Math.abs(offset);
	const tzHours = pad(Math.floor(absOffset / 60), 2);
	const tzMinutes = pad(Math.floor(absOffset % 60), 2);
	const encodedTz = `${tzSign}${tzHours}:${tzMinutes}`;
	return encodedDate + encodedTz;
}