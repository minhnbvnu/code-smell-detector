function hex_sha1(s) {
	return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}