function fill_wptr_from_string(ptr, v)
  {
	var j;
	var len = v.length;
	var data;

	assert((ptr&1)==0);
	ptr>>=1;

  	for(j = 0; j < len; j++)
	{
		data = v.charCodeAt(j);

		heapU16[ptr] = data;
		ptr++;
	}
		heapU16[ptr] = 0;
	}