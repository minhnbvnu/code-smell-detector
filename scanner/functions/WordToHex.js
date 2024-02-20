function WordToHex(lValue) {
		let WordToHexValue = "";
		let WordToHexValue_temp = "";
		let lByte;
		let lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValue_temp = `0${lByte.toString(16)}`;
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
		}
		return WordToHexValue;
	}