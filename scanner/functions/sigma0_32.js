function sigma0_32(x)
	{
		return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
	}