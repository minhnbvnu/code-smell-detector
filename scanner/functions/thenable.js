function thenable (value) {
	return value !== undefined && value !== null && typeof value === 'object' && callable(value.then)
}