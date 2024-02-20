function js_mandreel_flash_tcp_create(sp)
{
	var id = heap32[sp>>2];sp+=4;

	var flashMovie=mandreel_flash_sockets_getFlashMovieObject("FlashDivSockets");
	flashMovie.receiveMessage("create " + id);
}