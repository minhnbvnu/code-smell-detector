function js_mandreel_flash_tcp_connectTo(sp)
{
	var id = heap32[sp>>2];sp+=4;
	var ptr_string = heap32[sp>>2];sp+=4;
	var port = heap32[sp>>2];sp+=4;

	var server_name = get_string_from_ptr(ptr_string);

	var flashMovie=mandreel_flash_sockets_getFlashMovieObject("FlashDivSockets");
	flashMovie.receiveMessage("connect " + id + " " + server_name + " " + port);
}