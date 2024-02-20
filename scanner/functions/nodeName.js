function nodeName(n) {
	for(var i in nodenames){
		if(nodenames[i]==n) return i;
	}
	return '';
}