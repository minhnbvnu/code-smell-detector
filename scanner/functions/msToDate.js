function msToDate(timestamp) {
	const date = new Date(timestamp);
	return date.toLocaleDateString(['en-US'], { day: 'numeric', month: 'short' });
}