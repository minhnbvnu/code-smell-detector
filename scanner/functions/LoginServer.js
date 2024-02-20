function LoginServer() {
	if(!(this instanceof LoginServer)) {
		var singleton = universe.casino_login_server;
		return singleton ? singleton : new LoginServer();
	}
	
	if(universe.casino_login_server) {
		throw 'player server is a singleton, should not be created twice';
	}
	
	universe.casino_login_server = this;
	
	this.DROP_KICK_TIME = 30; // 30 sec
	this.io = null;
	this.db = null;
	this.timer = 0;
	
	/* Notice: each socket may link to multiple gamer objects
	 * this will support client as agent or robots
	 * socket.gamers = {}, uid -> gamer object
	 */
	this.sockets = {}; // sid -> socket
	this.sockets_count = 0;
	
	this.gamers = {};		// uid -> gamer
	this.gamers_count = 0;

	this.is_running = false;
}