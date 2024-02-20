function injectIgnoreComments() {
	return {
		renderChunk(code) {
			return code.replace(`import(`, `import(/* webpackIgnore: true */ `)
		}
	}
}