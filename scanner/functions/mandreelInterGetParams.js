function mandreelInterGetParams(sp)
{
	var params = [];

	var offset = 0;
	for (i=1;i<arguments.length;++i)
	{
		var type = arguments[i];

		switch(type)
		{
			case 'int':
				params[i-1] = heap32[(sp+offset)>>2];
				break;
			case 'float':
				params[i-1] = heapFloat[(sp+offset)>>2];
				break;
			case 'string':
				params[i-1] = get_string_from_ptr(heap32[(sp+offset)>>2]);
				break;
			default:
				assert(false);
		}
		offset+=4;
	}

	return params;
}