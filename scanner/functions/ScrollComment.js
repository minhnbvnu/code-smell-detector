function ScrollComment(parent, data) {
		_super.call(this, parent, data);
		this.dur *= this.parent.options.scroll.scale;
		this.ttl *= this.parent.options.scroll.scale;
	}