function replaceFile(fileName, replacement = 'export default {}') {
	const targetId = 'replace-' + Math.round(Math.random() * 10000)
	return {
		resolveId(importPath) {
			return importPath.endsWith(fileName) ? targetId : null
		},
		load(importPath) {
			return importPath === targetId ? replacement : null
		}
	}
}