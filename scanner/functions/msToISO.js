function msToISO(timestamp) {
	const date = new Date(timestamp);
	return date.toISOString();
}