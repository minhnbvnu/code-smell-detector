function tsCheck(result, path) {
	if (result.diagnostics.length > 0) {
		result.diagnostics.forEach(function(diag) {
			var lines = diag.file.text.substring(0, diag.start).split('\n');
			var line = lines.length;
			var col = lines[line - 1].length;
			console.error(diag.file.path + ': ' + diag.messageText + ' (' + line + ':' + col + ')');
		});
		throw new Error(path + ': typescript transpilation failed (' + result.diagnostics.length + ' error(s))');
	}
	return result;
}