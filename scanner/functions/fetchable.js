function fetchable (value) {
	return value !== undefined && value !== null && typeof value === 'object' && callable(value.json)
}