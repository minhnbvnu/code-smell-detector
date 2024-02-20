function imandreel_interop_callbridge(new_method, sp)
{

	var n = new Array();

	for( var i = 2; i < arguments.length; i++ )
	{

		if (typeof arguments[i] == 'string')
			n.push(atob(arguments[i]));
		else
			n.push(arguments[i]);
	}

	var total_args = arguments.length-2;

	switch(total_args)
	{
		case 0:
			return Mandreel_window[new_method](sp);
		case 1:
			return Mandreel_window[new_method](sp, n[0]);
		case 2:
			return Mandreel_window[new_method](sp, n[0], n[1]);
		case 3:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2]);
		case 4:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3]);
		case 5:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4]);
		case 6:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5]);
		case 7:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
		case 8:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7]);
		case 9:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8]);
		case 10:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9]);
		case 11:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10]);
		case 12:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11]);
		case 13:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12]);
		case 14:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12], n[13]);
		case 15:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12], n[13], n[14]);
		case 16:
			return Mandreel_window[new_method](sp, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12], n[13], n[14], n[15]);
		break;
	}

}