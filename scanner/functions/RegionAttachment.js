function RegionAttachment(name) {
	      var _this = _super.call(this, name) || this;
	      _this.x = 0;
	      _this.y = 0;
	      _this.scaleX = 1;
	      _this.scaleY = 1;
	      _this.rotation = 0;
	      _this.width = 0;
	      _this.height = 0;
	      _this.color = new spine.Color(1, 1, 1, 1);
	      _this.offset = spine.Utils.newFloatArray(8);
	      _this.uvs = spine.Utils.newFloatArray(8);
	      _this.tempColor = new spine.Color(1, 1, 1, 1);
	      return _this;
	    }