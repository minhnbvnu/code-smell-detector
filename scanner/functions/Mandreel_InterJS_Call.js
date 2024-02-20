function Mandreel_InterJS_Call(sp)
{
	var new_sp = sp;
	var method_ptr = heap32[sp>>2];sp+=4;
	var method = get_string_from_ptr(method_ptr);

	var params = new Array();


	params.push(new_sp);

	var var_int;
	var var_string;
	var var_double;

	var return_type;
	var return_ptr;
	while (true)
	{
		var my_type = heap32[sp>>2];sp+=4;


		if (my_type == MANDREELCALLJS_TYPE_RETURN_VOID)
		{
			return_type = my_type;
			break;
		}
		else if (my_type == MANDREELCALLJS_TYPE_INT)
		{
			var_int = heap32[sp>>2];

			params.push(var_int);
			sp+=4;
		}
		else if (my_type == MANDREELCALLJS_TYPE_FLOAT)
		{
			sp = (sp+7) & ~7;

			var_double = llvm_readDouble(sp);

			params.push(var_double);
			sp+=8;
		}
		else if (my_type == MANDREELCALLJS_TYPE_STRING)
		{
			var_int = heap32[sp>>2];
			var_string = get_string_from_ptr(var_int);

			params.push(var_string);
			sp+=4;
		}
		else if (my_type == MANDREELCALLJS_TYPE_RETURN_INT)
		{
			return_type = my_type;
			return_ptr = heap32[sp>>2];
			break;
		}
		else if (my_type == MANDREELCALLJS_TYPE_RETURN_FLOAT)
		{
			return_type = my_type;
			return_ptr = heap32[sp>>2];
			break;
		}
		else
		{
			assert(false, "invalid arguments calling Mandreel_InterJS_Call");
		}
	}

	var result = mandreel_my_call_external_array(method,params);

	r_g0 = result[0];


	if (r_g0 == 0)
	{
		if (return_type == MANDREELCALLJS_TYPE_RETURN_INT)
		{
			heap32[return_ptr>>2] = result[1];
		}
		else if (return_type == MANDREELCALLJS_TYPE_RETURN_FLOAT)
		{
			heapFloat[return_ptr>>2] = result[1];
		}

	}
}