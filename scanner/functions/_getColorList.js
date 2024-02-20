function _getColorList(o, name, validate) {
	if (validate && (!o[0] || !o[1])) { return ''; }
	let type = o.isGradient ? 'Gradient' : 'Color';
	let str = `\tstatic const List<${type}> ${name} = const [`;
	for (let i=0; true; i++) {
		if (!o[i]) { break; }
		str += `${i===0 ? '' : ', '}${o[i]}`;
	}
	return str + '];';
}