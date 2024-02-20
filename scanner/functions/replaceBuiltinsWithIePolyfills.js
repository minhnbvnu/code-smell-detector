function replaceBuiltinsWithIePolyfills() {
	// list of things that needs to be translated
	var translatables = [
		['Object.keys',        'ObjectKeys'],
		['Object.values',      'ObjectValues'],
		['Object.entries',     'ObjectEntries'],
		['Object.assign',      'ObjectAssign'],
		['Object.fromEntries', 'ObjectFromEntries'],
		['Array.from',         'ArrayFrom'],
		['new Set',            'NewSet'],
		['new Map',            'NewMap'],
		['Number.isNaN',       'isNaN'],
	]
	// keys of translatables and builtings (like fetch)
	return {
		async transform(code, filePath) {
			if (!filePath.includes('exifr')) return null
			// ignore all cross imported polyfill files to preventcircular dependency
			if (filePath.endsWith('ie.mjs')) return null
			if (filePath.endsWith('global.mjs')) return null
			for (let [from, to] of translatables)
				code = code.replace(new RegExp(from, 'g'), to)
			let polyfillKeys = Object.keys(polyfills)
			let polyfillPath = createRelativeImportPath(filePath, 'polyfill/ie.mjs')
			let importLine = `import {${polyfillKeys.join(', ')}} from '${polyfillPath}'`
			return importLine + '\n' + code
		}
	}
}