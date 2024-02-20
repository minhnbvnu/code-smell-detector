function binb2bytes(binarray, formatOpts)
	{
		var str = "", length = binarray.length * 4, i, srcByte;

		for (i = 0; i < length; i += 1)
		{
			srcByte = (binarray[i >>> 2] >>> ((3 - (i % 4)) * 8)) & 0xFF;
			str += String.fromCharCode(srcByte);
		}

		return str;
	}