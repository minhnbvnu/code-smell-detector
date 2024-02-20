function getVueLanguageServiceHost(path, content) {
	const tsconfig = findTsconfig(path);
	const vueCompilerOptions = getVueCompilerOptions(tsconfig);

	return {
		...getTypeScriptLanguageServiceHost(path, content),
		getVueCompilationSettings: () => vueCompilerOptions,
		/**
		 * Can return either `require('typescript')` or `require('typescript/lib/tsserverlibrary')`.
		 *
		 * @see https://github.com/simonhaenisch/prettier-plugin-organize-imports/pull/60#discussion_r934408179
		 *
		 * @returns {any}
		 */
		getTypeScriptModule: () => ts,
	};
}