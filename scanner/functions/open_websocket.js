function open_websocket()
{
	//if(ws_url.startswith("ws://localhost:")&&window.location.hostname!="127.0.0.1"&&window.location.hostname!="localhost")
	//{
		//divlog("Server administrator should set <em>server_hostname</em> correctly, because it is left as <em>\"localhost\"</em>. Now guessing hostname from page URL.",1);
		ws_url="ws://"+(window.location.origin.split("://")[1])+"/ws/"; //guess automatically -> now default behaviour
	//}
	if (!("WebSocket" in window))
		divlog("Your browser does not support WebSocket, which is required for WebRX to run. Please upgrade to a HTML5 compatible browser.");
	ws = new WebSocket(ws_url+client_id);
	ws.onopen = on_ws_opened;
	ws.onmessage = on_ws_recv;
	ws.onclose = on_ws_closed;
	ws.binaryType = "arraybuffer";
	window.onbeforeunload = function() { //http://stackoverflow.com/questions/4812686/closing-websocket-correctly-html5-javascript
		ws.onclose = function () {};
		ws.close();
	};
	ws.onerror = on_ws_error;
}