function gamma0_32(x)
	{
		return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
	}