function createStandardDescriptionMap(standards) {
	const map = {};
	standards.forEach(standard => {
		standard.rules.forEach(rule => {
			map[rule.name] = rule.description;
		});
	});
	return map;
}