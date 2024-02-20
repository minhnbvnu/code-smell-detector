function safeAdd_32_2(a, b)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}