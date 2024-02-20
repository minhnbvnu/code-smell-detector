function objectFromArray(modules) {
	var obj = {}
	modules.forEach(moduleName => obj[moduleName] = moduleName)
	return obj
}