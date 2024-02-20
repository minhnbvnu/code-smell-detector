function _buildStyleRegExp(map) {
	let list = [];
	for (let n in map) { list.push(n); }
	return new RegExp(list.join("|"), "ig");
}