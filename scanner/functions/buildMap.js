function buildMap(arr, value=true) {
	return arr.reduce((o,s) => (o[s] = value, o), {});
}