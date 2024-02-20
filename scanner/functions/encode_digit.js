function encode_digit(d, flag) {
		return d + 22 + 75 * (d < 26) - ((flag != 0) << 5);
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
	}