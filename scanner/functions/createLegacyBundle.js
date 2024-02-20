function createLegacyBundle(inputPath, outputPath) {
	return {
		input: inputPath,
		plugins: [
			notify(),
			replaceFile('FsReader.mjs', 'export default {}'),
			replaceFile('import.mjs',   'export default function() {}'),
			babel(babelLegacy),
			replaceBuiltinsWithIePolyfills(),
			replaceFetchPolyfills(),
			fixIeStaticMethodSubclassing(),
			terser(terserConfig),
			cloneCjsAndMjsToJs(),
		],
		external,
		output: {
			file: outputPath,
			format: 'umd',
			exports: 'named',
			name,
			amd,
			globals,
		},
	}
}