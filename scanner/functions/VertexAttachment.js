function VertexAttachment(name) {
	      var _this = _super.call(this, name) || this;
	      _this.id = (VertexAttachment.nextID++ & 65535) << 11;
	      _this.worldVerticesLength = 0;
	      _this.deformAttachment = _this;
	      return _this;
	    }