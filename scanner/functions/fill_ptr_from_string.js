function fill_ptr_from_string(ptr, v)
  {
	var j;
	var len = v.length;
	var data;

  	for(j = 0; j < len; j++)
	{
		data = v.charCodeAt(j);

		heapU8[ptr] = data;
		ptr++;
	}
		heapU8[ptr] = 0;
	}