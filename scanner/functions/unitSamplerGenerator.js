function unitSamplerGenerator( seed ) {

	// 32-bit xorshift, requires only a nonzero seed
	// http://excamera.com/sphinx/article-xorshift.html
	var sample = parseInt( generateHash( seed ), 16 ) || -1;
	return function() {
		sample ^= sample << 13;
		sample ^= sample >>> 17;
		sample ^= sample << 5;

		// ECMAScript has no unsigned number type
		if ( sample < 0 ) {
			sample += 0x100000000;
		}

		return sample / 0x100000000;
	};
}