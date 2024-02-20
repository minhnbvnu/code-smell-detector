function Room( casino, typeid, roomid, options ) {
	this.options = {
		max_seats: 4
	};
	if(options && (typeof options === 'object')) {
		for(var i in options) this.options[i] = options[i];
	}
	
	this.casino = casino;
	this.db = casino.db;
	this.pub = casino.pub;
	
	this.id = roomid;
	this.type = typeid;
	this.name = '';
	
	this.gamers = {};
	this.gamers_count = 0;
	
	this.seats_count = this.options.max_seats;
	this.seats_taken = 0;
	this.seats = [];
	for(var j=0; j<this.seats_count; j++) {
		this.seats.push(null);
	}
	
	var room = this;
	this.timer = setInterval(function(){
		room.tick();
	}, 1000);
}