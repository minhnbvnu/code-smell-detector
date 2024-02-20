function getVueCompilerOptions(tsconfig) {
	return tsconfig
		? require('@volar/vue-language-core').createParsedCommandLine(
				// @ts-ignore
				ts,
				ts.sys,
				tsconfig,
				[],
		  ).vueOptions
		: {};
}