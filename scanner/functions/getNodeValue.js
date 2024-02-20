function getNodeValue(){
	if(arrayContains(group, ngnd)) return false;
	if(arrayContains(group, npwr)) return true;
	for(var i in group){
		var nn = group[i];
		var n = nodes[nn];
		if(n.pullup) return true;
		if(n.pulldown) return false;
		if(n.state) return true;
	}
	return false;
}