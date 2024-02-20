function presentIgnoreRules(ignore) {
	return ignore.map(name => {
		return {
			name,
			description: rules[name]
		};
	});
}