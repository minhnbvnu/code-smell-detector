function scriptNumSize(i) {
		return i > 0x7fffffff ? 5
			: i > 0x7fffff ? 4
			: i > 0x7fff ? 3
			: i > 0x7f ? 2
			: i > 0x00 ? 1
			: 0;
	}