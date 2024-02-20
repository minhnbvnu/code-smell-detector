function createModernBundle(inputPath, esmPath, umdPath) {
	return {
		input: inputPath,
		plugins: [
			notify(),
			babel(babelModern),
			terser(terserConfig),
			injectIgnoreComments(),
			cloneCjsAndMjsToJs(),
		],
		external,
		output: [
			{
				file: esmPath,
				format: 'esm',
				exports: 'named',
				globals,
			},
			{
				file: umdPath,
				format: 'umd',
				exports: 'named',
				globals,
				name,
				amd,
			}
		]
	}
}