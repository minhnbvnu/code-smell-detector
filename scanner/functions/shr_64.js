function shr_64(x, n)
	{
		var retVal = null;

		if (32 >= n)
		{
			retVal = new Int_64(
					x.highOrder >>> n,
					x.lowOrder >>> n | ((x.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					0,
					x.highOrder >>> (n - 32)
				);
		}

		return retVal;
	}