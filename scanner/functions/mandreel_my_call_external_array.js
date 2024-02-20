function mandreel_my_call_external_array(method, params)
{
	var result
	var resultString;
	try
	{
		switch(params.length)
		{
			case 1:
				resultString = Mandreel_window[method](params[0]);
				break;
			case 2:
				resultString = Mandreel_window[method](params[0],params[1]);
				break;
			case 3:
				resultString = Mandreel_window[method](params[0],params[1],params[2]);
				break;
			case 4:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3]);
				break;
			case 5:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4]);
				break;
			case 6:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5]);
				break;
			case 7:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6]);
				break;
			case 8:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7]);
				break;
			case 9:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8]);
				break;
			case 10:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8],params[9]);
				break;
			case 11:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8],params[9],params[10]);
				break;
			case 12:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8],params[9],params[10],params[11]);
				break;
			case 13:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8],params[9],params[10],params[11],params[12]);
				break;
			case 14:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8],params[9],params[10],params[11],params[12],params[13]);
				break;
			case 15:
				resultString = Mandreel_window[method](params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8],params[9],params[10],params[11],params[12],params[13],params[14]);
				break;
			default:
				assert(false);
		}
		result = 0;
	} catch(e) { dump('error calling ' + method + '\n'); dump(e); result = 1;}

	return [result,resultString];
}