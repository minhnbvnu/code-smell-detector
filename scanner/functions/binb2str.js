function binb2str(bin) {
	var str = '', mask = (1 << chrsz) - 1;
	for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> 32 - chrsz - i % 32 & mask);
	return str;
}