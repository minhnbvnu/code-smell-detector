function MapPin(index, icon, coordinates, map){
	this.index=index;

	this.icon=icon;
	this.coordinates=coordinates;
	this.coordinates.x=MapPin.formatFloat(this.coordinates.x);
	this.coordinates.y=MapPin.formatFloat(this.coordinates.y);
	this.coordinates.z=MapPin.formatFloat(this.coordinates.z);
	this.map=map;
}