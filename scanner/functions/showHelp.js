function showHelp (callback) {
	for (let k in fns) {
		let out = `${k.bold}: ${fns[k].helptxt}`;
		if (fns[k].help) {
			out += ` (${fns[k].help})`.dim;
		}
		console.log(out);
	}
	console.log();
	return callback();
}