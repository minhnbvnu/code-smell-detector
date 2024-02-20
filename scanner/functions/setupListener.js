function setupListener (sc) {
	socket = new WebSocket('ws://' + window.location.hostname + ':8100');

	var handlerFcn = handler(sc, socket);
	socket.onmessage = (evt) => {
		try {
			handlerFcn(evt);
		} catch (e) {
			window.onerror(e.message, null, e.line, null, e);
		}
	};

	socket.onopen = function () {
		sc.getService("set:sys", (setcal) => {
			socket.send(JSON.stringify({
				type: "identification",
				serial: sc.ipcMsg(68).sendTo(setcal).assertOk().data,
				version: sc.version
			}));
		});
		utils.log("Connected to PC...");
	};

	socket.onerror = function() {
		utils.log("socket error, attempting to reconnect in 5 seconds...");
		window.setTimeout(() => {
			socket.close();
			setupListener(sc);
		}, 5000);
	};
	
	socket.onclose = function() {
		utils.log("socket closed, attempting to reconnect in 5 seconds...");
		window.setTimeout(() => {
			utils.log("attempting to reconnect...");
			setupListener(sc);
		}, 5000);
	};
}