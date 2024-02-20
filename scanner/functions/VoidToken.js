function VoidToken(/**String*/type) {
	this.toString = function() {return "<VOID type=\""+type+"\">"};
	this.is = function(){return false;}
}