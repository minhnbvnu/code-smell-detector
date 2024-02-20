function mapLine(mapper, theMap, genMap, line) {
	mapper.addMapping({
		original: {
			line: theMap.count++,
			column: 0
		},
		generated: {
			line: genMap.count++,
			column: 0
		},
		source: theMap.filename
	});
	genMap.code += line + '\n';
}