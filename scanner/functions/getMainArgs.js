function getMainArgs() {
	let i = -1;
	const result = [];
	const mainArgs = process.argv.slice(2);
	while (++i < mainArgs.length) {
		if (mainArgs[i] === "--") break;
		result.push(mainArgs[i]);
	}
	return result;
}