function str_sha1(s) {
	return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}