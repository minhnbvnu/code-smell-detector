function hex_hmac_sha1(key, data) {
	return binb2hex(core_hmac_sha1(key, data));
}