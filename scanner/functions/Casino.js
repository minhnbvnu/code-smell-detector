function Casino(){
	if(!(this instanceof Casino)) {
		var singleton = universe.casino_game_server;
		return singleton ? singleton : new Casino();
	}
	
	if(universe.casino_game_server) {
		throw 'casino server is a singleton, should not be created twice';
	}
	
	universe.casino_game_server = this;
	
	this.id = 0;
	this.timer = 0;
	
	this.gametypes = {};
	this.gametypes_count = 0;
	
	this.rooms = {};
	this.rooms_count = 0;
	
	this.is_running = false;
}