function tryParseInt(value) {
	if (value === null || value === undefined) {
		return undefined
	}

	return parseInt(value)
}