function b642binb(str)
	{
		var retVal = [], byteCnt = 0, index, i, j, tmpInt, strPart, firstEqual, offset,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

		if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/))
		{
			throw "Invalid character in base-64 string";
		}
		firstEqual = str.indexOf('=');
		str = str.replace(/\=/g, '');
		if ((-1 !== firstEqual) && (firstEqual < str.length))
		{
			throw "Invalid '=' found in base-64 string";
		}

		for (i = 0; i < str.length; i += 4)
		{
			strPart = str.substr(i, 4);
			tmpInt = 0;

			for (j = 0; j < strPart.length; j += 1)
			{
				index = b64Tab.indexOf(strPart[j]);
				tmpInt |= index << (18 - (6 * j));
			}

			for (j = 0; j < strPart.length - 1; j += 1)
			{
				offset = byteCnt >>> 2;
				while (retVal.length <= offset)
				{
					retVal.push(0);
				}
				retVal[offset] |= ((tmpInt >>> (16 - (j * 8))) & 0xFF) <<
					(24 - (8 * (byteCnt % 4)));
				byteCnt += 1;
			}
		}

		return {"value" : retVal, "binLen" : byteCnt * 8};
	}