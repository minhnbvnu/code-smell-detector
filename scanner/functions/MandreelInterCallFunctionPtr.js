function MandreelInterCallFunctionPtr(returnType,func_ptr)
{
	var size_params = 0;

	var i;
	var num_params = (arguments.length-2)/2;
	num_params|=0;
	for (i=2;i<num_params*2+2;i+=2)
	{
		var type = arguments[i];

		var size_arg = 0;
		switch(type)
		{
			case 'int':
				size_arg = 4;
				break;
			case 'float':
				size_arg = 4;
				break;
			case 'string':
				size_arg = 4;
				size_arg += ((arguments[i+1].length + 4) & 0xfffffffc);
				break;
			case 'wstring':
				size_arg = 4;
				size_arg += ((arguments[i+1].length*2 + 4) & 0xfffffffc);
				break;
			default:
				assert(false);
		}

		size_params += size_arg;
	}

	// stack always 8 byte aligned
	size_params=((size_params+7)& 0xfffffff8);

	var sp = 0;

	if (i<(arguments.length))
		sp = arguments[i];
	else
	{
		assert(false);
		//assert(g_mandreel_frame_locked == true);
		//sp = g_stack_pointer+800*1024;
	}

	sp-=size_params;

	var offset = 0;
	var ptr_data = num_params*4+sp;
    for (i=2;i<num_params*2+2;i+=2)
	{
		var type = arguments[i];

		var size_arg = 0;
		switch(type)
		{
			case 'int':
				heap32[(sp+offset)>>2] = arguments[i+1];
				break;
			case 'float':
				heapFloat[(sp+offset)>>2] = arguments[i+1];
				break;
			case 'string':
				{
					heap32[(sp+offset)>>2] = ptr_data;
					var string = arguments[i+1];
					fill_ptr_from_string(ptr_data,string);

					ptr_data += ((string.length + 4) & 0xfffffffc);
				}
				break;
			case 'wstring':
				{
					MandreelInterWriteInt((sp+offset),ptr_data);
					var string = arguments[i+1];
					MandreelInterWriteWString(ptr_data,string);

					ptr_data += ((string.length*2 + 4) & 0xfffffffc);
				}
				break;
			default:
				assert(false);
		}
		offset+=4;
	}

	__FUNCTION_TABLE__[(func_ptr)>>2](sp);

	if (returnType == 'int')
		return r_g0;
	else if (returnType == 'float')
		return f_g0;
	else
	{
		assert(returnType == 'void');
		return;
	}
}