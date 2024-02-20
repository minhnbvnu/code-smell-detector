function js_mandreel_flash_socket_ready()
{
	js_mandreel_flash_socket_swf_loaded = true;
	if (mandreel_flash_socket_callback)
		mandreel_flash_socket_callback();
}