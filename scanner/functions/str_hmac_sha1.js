function str_hmac_sha1(key, data) {
	return binb2str(core_hmac_sha1(key, data));
}