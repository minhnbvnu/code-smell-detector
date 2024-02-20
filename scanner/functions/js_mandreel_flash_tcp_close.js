function js_mandreel_flash_tcp_close(sp)
{
	var id = heap32[sp>>2];sp+=4;


	var flashMovie=mandreel_flash_sockets_getFlashMovieObject("FlashDivSockets");
	flashMovie.receiveMessage("close " + id);
	dump("js_mandreel_flash_tcp_close " + id);
}