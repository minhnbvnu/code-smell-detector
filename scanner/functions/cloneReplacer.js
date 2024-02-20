function cloneReplacer(key, val) {
	if (typeof val === 'object') {
		for (let Class of jsonTypes) {
			if (val instanceof Class) {
				let replacer = replacers[Class.name]
				let serialized = replacer(val)
				return getTypeHeader(Class.name) + serialized + jsonTypeEnd
			}
		}
	}
	return val
}