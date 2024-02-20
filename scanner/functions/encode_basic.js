function encode_basic(bcp, flag) {
		bcp -= (bcp - 97 < 26) << 5;
		return bcp + ((!flag && (bcp - 65 < 26)) << 5);
	}