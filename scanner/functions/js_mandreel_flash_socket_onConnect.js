function js_mandreel_flash_socket_onConnect(message)
{
	var id = parseInt(message);

	var sp = g_stack_pointer+512*1024;

	dump('connected ' + id);

	heap32[sp>>2] = id;
	mandreel_flash_tcp_onConnect(sp);
}