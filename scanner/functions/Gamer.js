function Gamer() {
	if(!(this instanceof Gamer)) return new Gamer();
	
	this.uid = null;
	this.profile = {};
	this.room = null;
	this.seat = -1;
}