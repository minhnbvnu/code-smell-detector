function isArabicChar(c) {
	    return /[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(c);
	}