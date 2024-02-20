function mandreel_removecr(my_string)
{
	var new_string = '';
	for(var j = 0; j < my_string.length; j++)
	{
		var data = my_string.charCodeAt(j);

		if (data != 13)
		{
			 var t = String.fromCharCode(data);
			 new_string+=t;
		}
	}

	return 	new_string;
}