function createRelativeImportPath(sourcePath, targetPath) {
	let importPath = path
		.relative(path.dirname(sourcePath), path.join(exifrDir, './src/', targetPath))
		.replace(/\\/g, '/')
	if (!importPath.startsWith('.')) importPath = './' + importPath
	return importPath
}