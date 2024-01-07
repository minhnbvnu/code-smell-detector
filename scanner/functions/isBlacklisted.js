function isBlacklisted() {
	  var blacklist = this.opts.blacklist;
	  return blacklist && blacklist.indexOf(this.node.type) > -1;
	}