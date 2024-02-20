function tsCompile(source, path, options) {
	var ts = require('typescript');
	var tsOptions = {
		compilerOptions: options.typescript || {
			target: ts.ScriptTarget.ES2015,
			module: ts.ModuleKind.ES2015,
			sourceMap: true,
		},
		fileName: path,
		reportDiagnostics: true,
	};
	return tsCheck(ts.transpileModule(source, tsOptions), path);
}