function sigma1_32(x)
	{
		return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
	}