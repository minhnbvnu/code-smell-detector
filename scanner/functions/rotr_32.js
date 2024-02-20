function rotr_32(x, n)
	{
		return (x >>> n) | (x << (32 - n));
	}