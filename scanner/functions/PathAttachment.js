function PathAttachment(name) {
	      var _this = _super.call(this, name) || this;
	      _this.closed = false;
	      _this.constantSpeed = false;
	      _this.color = new spine.Color(1, 1, 1, 1);
	      return _this;
	    }