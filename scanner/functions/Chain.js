function Chain(valueLinks) {
	this.nodes = [];
	this.cursor = -1;
	
	if (valueLinks && valueLinks.length > 0) {
		this.push(valueLinks[0], "//");
		for (var i = 1, l = valueLinks.length; i < l; i+=2) {
			this.push(valueLinks[i+1], valueLinks[i]);
		}
	}
}