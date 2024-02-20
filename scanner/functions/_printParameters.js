function _printParameters(n, depth) {
	let d = depth || 0;
	let t = "";
	for (let i = 0; i < d; ++i)
		t += "  ";
	trace(`${t}node - ${n.constructor.name}`);
	if (n.parameters) {
		let values = Object.entries(n.parameters);
		for (let [key, value] of values) {
			trace(`    ${t}${key}`);
		}
	}
	if (n.children) {
		n.children.forEach((child) => {
			printParameters(child, d + 1);
		});
	}
}