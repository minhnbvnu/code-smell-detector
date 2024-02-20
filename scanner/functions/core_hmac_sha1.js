function core_hmac_sha1(key, data) {
	var bkey = str2binb(key);
	bkey.length > 16 && (bkey = core_sha1(bkey, key.length * chrsz));
	var ipad = Array(16), opad = Array(16);
	for (var i = 0; i < 16; i++) ipad[i] = bkey[i] ^ 909522486, opad[i] = bkey[i] ^ 1549556828;
	var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
	return core_sha1(opad.concat(hash), 672);
}