function get_mb(text) {
	return parseInt((text.length / 1024 / 1024) * 10) / 10;
}