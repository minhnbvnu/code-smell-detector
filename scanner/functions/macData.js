function macData(macSaltKey, data) {
	var salt1 = new Buffer(40);
	salt1.fill(0x36);
	
	var salt2 = new Buffer(48);
	salt2.fill(0x5c);

	var dataLength = new type.UInt32Le(data.length).toStream().buffer;
	
	var sha1 = crypto.createHash('sha1');
	sha1.update(macSaltKey);
	sha1.update(salt1);
	sha1.update(dataLength);
	sha1.update(data);
	var sha1Digest = sha1.digest();
	
	var md5 = crypto.createHash('md5');
	md5.update(macSaltKey);
	md5.update(salt2);
	md5.update(sha1Digest);
	
	return md5.digest();
}