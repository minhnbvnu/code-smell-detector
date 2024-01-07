function setKey(key) {
	  this.key = key;
	  this.node = this.container[this.key];
	  this.type = this.node && this.node.type;
	}