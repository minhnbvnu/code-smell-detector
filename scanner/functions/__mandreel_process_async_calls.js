function __mandreel_process_async_calls()
{
	if (__mandreel_async_calls_mandreel.length)
	{
		var temp_list = __mandreel_async_calls_mandreel.slice(0);

		__mandreel_async_calls_mandreel = [];

		for (var i=0;i<temp_list.length;++i)
		{
			var param = temp_list[i].param;
			var func_name = temp_list[i].func_name;

			var size = ((param.length + 1)+7)&0xFFFFFFF8;

			var sp = g_stack_pointer+800*1024;

			var str_ptr = sp - size;
			fill_ptr_from_string(str_ptr,param);

			sp = str_ptr - 4;
			heap32[sp>>2] = str_ptr;

			Mandreel_window[func_name](sp);
		}
	}

	if (__mandreel_async_calls_js.length)
	{
		var temp_list = __mandreel_async_calls_js.slice(0);

		__mandreel_async_calls_js = [];

		for (var i=0;i<temp_list.length;++i)
		{
			var param = temp_list[i].param;
			var func_name = temp_list[i].func_name;

			Mandreel_window[func_name](param);

		}
	}
}