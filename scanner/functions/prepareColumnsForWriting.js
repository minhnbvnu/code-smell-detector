function prepareColumnsForWriting(columns) {
	var pretty = 'columns: ' + JSON.stringify(columns, null, 4) + ',\n';
	var output = [];
	_.each(pretty.split('\n'), function(line) {
		if (line === '' || /^\s+$/.test(line)) {
			return; // skip empty line
		}
		output.push('\t\t' + line);
	});
	return output.join('\n');
}