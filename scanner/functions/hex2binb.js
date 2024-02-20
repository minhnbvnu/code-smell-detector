function hex2binb(str)
	{
		var bin = [], length = str.length, i, num, offset;

		if (0 !== (length % 2))
		{
			throw "String of HEX type must be in byte increments";
		}

		for (i = 0; i < length; i += 2)
		{
			num = parseInt(str.substr(i, 2), 16);
			if (!isNaN(num))
			{
				offset = i >>> 3;
				while (bin.length <= offset)
				{
					bin.push(0);
				}
				bin[i >>> 3] |= num << (24 - (4 * (i % 8)));
			}
			else
			{
				throw "String of HEX type contains invalid characters";
			}
		}

		return {"value" : bin, "binLen" : length * 4};
	}