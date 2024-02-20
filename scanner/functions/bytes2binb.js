function bytes2binb(str)
	{
		var bin = [], codePnt, i, offset;

		for (i = 0; i < str.length; i += 1)
		{
			codePnt = str.charCodeAt(i);

			offset = i >>> 2;
			if (bin.length <= offset)
			{
				bin.push(0);
			}
			bin[offset] |= codePnt << (24 - (8 * (i % 4)));
		}

		return {"value" : bin, "binLen" : str.length * 8};
	}