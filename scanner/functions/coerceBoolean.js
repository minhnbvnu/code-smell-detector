function coerceBoolean(value) {
	return !['false', 'no', '0'].includes(value.toLowerCase());
}