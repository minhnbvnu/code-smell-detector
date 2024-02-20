function on_ws_closed()
{
	try
	{
		audio_node.disconnect();
	}
	catch (dont_care) {}
	divlog("WebSocket has closed unexpectedly. Please reload the page.", 1);
}