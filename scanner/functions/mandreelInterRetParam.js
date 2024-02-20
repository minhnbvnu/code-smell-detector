function mandreelInterRetParam(type, value)
{
	switch(type)
	{
		case 'int':
			r_g0 = value;
			break;
		case 'float':
			f_g0 = value;
			break;
		default:
			assert(false);
	}

	return 0;
}