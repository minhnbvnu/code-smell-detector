function Mandreel_Device_SetFullScreen(sp)
{
	var enable = heap32[sp>>2];sp+=4;
	mandreelAppFullscreen(enable);
}