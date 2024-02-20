function mysqlNativePassword(password, seed) {
	const pwd1 = hash('sha1', encode2(password));
	const pwd2 = hash('sha1', pwd1);
	let seedAndPwd2 = new Uint8Array(seed.length + pwd2.length);
	seedAndPwd2.set(seed);
	seedAndPwd2.set(pwd2, seed.length);
	seedAndPwd2 = hash('sha1', seedAndPwd2);
	return xor(seedAndPwd2, pwd1);
}