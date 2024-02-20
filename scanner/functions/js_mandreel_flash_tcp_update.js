function js_mandreel_flash_tcp_update(sp)
{
	var id = heap32[sp>>2];sp+=4;
	var size = heap32[sp>>2];sp+=4;

	var flashMovie=mandreel_flash_sockets_getFlashMovieObject("FlashDivSockets");
	flashMovie.receiveMessage("receive " + id + " " + size);
}