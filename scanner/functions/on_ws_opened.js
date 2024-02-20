function on_ws_opened()
{
	ws.send("SERVER DE CLIENT openwebrx.js");
	divlog("WebSocket opened to "+ws_url);
}