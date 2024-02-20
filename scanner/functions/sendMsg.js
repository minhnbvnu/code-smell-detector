function sendMsg (cmd, args = []) {
	connection.send(JSON.stringify({
		cmd,
		args
	}));
}