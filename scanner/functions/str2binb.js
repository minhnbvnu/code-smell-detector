function str2binb(str) {
	var bin = Array(), mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 32 - chrsz - i % 32;
	return bin;
}