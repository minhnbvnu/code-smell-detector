function toCode(code) {
	let fn = code >= 400 ? 'red' : code > 300 ? 'yellow' : 'green';
	return colors[fn](code);
}