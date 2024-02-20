function saltedHash(input, salt, salt1, salt2) {
	var sha1Digest = crypto.createHash('sha1');
	sha1Digest.update(input);
	sha1Digest.update(salt.slice(0, 48));
	sha1Digest.update(salt1);
	sha1Digest.update(salt2);
	
	var sha1Sig = sha1Digest.digest();
	
	var md5Digest = crypto.createHash('md5');
	md5Digest.update(salt.slice(0, 48));
	md5Digest.update(sha1Sig);
	return md5Digest.digest();
}