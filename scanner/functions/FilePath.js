function FilePath(absPath, separator) {
	this.slash =  separator || "/"; 
	this.root = this.slash;
	this.path = [];
	this.file = "";
	
	var parts = absPath.split(/[\\\/]/);
	if (parts) {
		if (parts.length) this.root = parts.shift() + this.slash;
		if (parts.length) this.file =  parts.pop()
		if (parts.length) this.path = parts;
	}
	
	this.path = this.resolvePath();
}