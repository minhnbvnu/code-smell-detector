function applyToJsonMethods(map) {
	for (let [Class, fn] of map)
		Class.prototype.toJSON = fn
}