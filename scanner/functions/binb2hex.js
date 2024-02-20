function binb2hex(binarray) {
	var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef', str = '';
	for (var i = 0; i < binarray.length * 4; i++) str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 15);
	return str;
}