function setHigh(name){
	var nn = nodenames[name];
	nodes[nn].pullup = true;
	nodes[nn].pulldown = false;
	recalcNodeList([nn]);
}