function js_mandreel_flash_socket_onError(message)
{
	var id = parseInt(message);

	var sp = g_stack_pointer+512*1024;

	dump('on error ' + id);

	heap32[sp>>2] = id;
	mandreel_flash_tcp_onError(sp);

}