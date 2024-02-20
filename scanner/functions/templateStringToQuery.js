function templateStringToQuery(template, args, result_type) {
	const text = template.reduce((curr, next, index) => {
		return `${curr}$${index}${next}`;
	});
	return new Query(text, result_type, ...args);
}