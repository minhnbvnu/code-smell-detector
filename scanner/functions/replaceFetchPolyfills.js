function replaceFetchPolyfills() {
	return {
		async transform(code, filePath) {
			if (!filePath.includes('exifr')) return null
			// ignore all cross imported polyfill files to preventcircular dependency
			if (filePath.endsWith('ie.mjs')) return null
			if (filePath.endsWith('fetch.mjs')) return null
			if (filePath.endsWith('global.mjs')) return null
			if (filePath.endsWith('fetch-node.mjs')) return null
			if (filePath.endsWith('fetch-xhr.mjs')) return null
			code = code.replace('polyfill/fetch-node.mjs', 'polyfill/fetch-xhr.mjs')
			let polyfillPath = createRelativeImportPath(filePath, 'polyfill/fetch-xhr.mjs')
			let importLine = `import '${polyfillPath}'`
			return importLine + '\n' + code
		}
	}
}