function js_mandreel_flash_tcp_write(sp)
{
	var id = heap32[sp>>2];sp+=4;
	var ptr = heap32[sp>>2];sp+=4;

	var message = get_string_from_ptr(ptr);

	dump('js_mandreel_flash_tcp_write ' + message);

	var flashMovie=mandreel_flash_sockets_getFlashMovieObject("FlashDivSockets");
	r_g0 = flashMovie.receiveMessage("send " + id + " " + message);
}