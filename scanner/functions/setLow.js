function setLow(name){
	var nn = nodenames[name];
	nodes[nn].pullup = false;
	nodes[nn].pulldown = true;
	recalcNodeList([nn]);
}