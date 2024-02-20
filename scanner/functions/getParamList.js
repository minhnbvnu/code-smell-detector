function getParamList(arr) {
	let str = '';
	arr.forEach((o) => { if (o) { str += o; } });
	return str;
}