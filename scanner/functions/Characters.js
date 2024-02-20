function Characters(locator, data){
	Node.call(this, locator);
	this.data = data;
	this.nodeType = NodeType.CHARACTERS;
}