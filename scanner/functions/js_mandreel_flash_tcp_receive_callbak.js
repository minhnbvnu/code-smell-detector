function js_mandreel_flash_tcp_receive_callbak(message)
{
	var strings = message.split(' ');

	var id = parseInt(strings[0]);
	var data = strings[1];

	var sp = g_stack_pointer+512*1024;

	var data_ptr = sp + 1024;
	fill_ptr_from_string(data_ptr,data);

	heap32[sp>>2] = id;
	heap32[(sp+4)>>2] = data_ptr;
	mandreel_flash_tcp_receive_callbak(sp);
}