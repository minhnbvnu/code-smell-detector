function finalHash (key, random1, random2) {
	var md5Digest = crypto.createHash('md5');
	md5Digest.update(key);
	md5Digest.update(random1);
	md5Digest.update(random2);
	return md5Digest.digest();
}