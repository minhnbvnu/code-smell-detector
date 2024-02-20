function getTrailingOptions() {
	let sepFound = false;
	return process.argv.slice(2).reduce((res, i) => {
		if (i === "--") {
			sepFound = true;
		}
		if (sepFound) {
			return `${res} ${i}`;
		}
		return res;
	}, "");
}