function masterSecret (secret, random1, random2) {
	var sh1 = saltedHash(new Buffer('A'), secret, random1, random2);
	var sh2 = saltedHash(new Buffer('BB'), secret, random1, random2);
	var sh3 = saltedHash(new Buffer('CCC'), secret, random1, random2);
	
	var ms = new Buffer(sh1.length + sh2.length + sh3.length);
	sh1.copy(ms);
	sh2.copy(ms, sh1.length);
	sh3.copy(ms, sh1.length + sh2.length);
	return ms;
}