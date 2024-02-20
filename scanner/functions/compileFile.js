function compileFile(from, to, command, options) {
	var ext = path.extname(from);

	if (ext !== '.js' && ext !== '.jsm' && ext !== '.es6' && ext !== '.jsx')
		return;

	if (to) {
		var extTo = path.extname(to);
		to = to.slice(0, -extTo.length) + '.js';
	}

	var source = fs.readFileSync(from, 'utf-8');
	var result = buble.transform(source, {
		target: options.target,
		transforms: options.transforms,
		source: from,
		file: to,
		jsx: options.jsx,
		objectAssign: options.objectAssign,
		namedFunctionExpressions: options.namedFunctionExpressions
	});

	write(result, to, command);
}