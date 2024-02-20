function cloneReviver(key, val) {
	if (typeof val === 'string' && val.startsWith(jsonTypeStart) && val.endsWith(jsonTypeEnd)) {
		let tempIndex = val.indexOf(jsonStartSeparator)
		let type = val.slice(jsonTypeStart.length, tempIndex)
		let serialized = val.slice(tempIndex + jsonStartSeparator.length, -jsonTypeEnd.length)
		let reviver = revivers[type]
		return reviver(serialized)
	}
	return val
}