function gamma1_32(x)
	{
		return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
	}