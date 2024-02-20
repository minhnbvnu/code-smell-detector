function getOutputCss(output) {
	const result = output.results[0]._postcssResult;
	const css = result.root.toString(result.opts.syntax);

	return css;
}