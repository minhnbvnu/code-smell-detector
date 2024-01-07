function SpineComponent(system, entity) {
	    var _this;
	    _classCallCheck(this, SpineComponent);
	    _this = _super.call(this, system, entity);
	    _this.on('set_atlasAsset', _this.onSetAsset, _assertThisInitialized(_this));
	    _this.on('set_textureAssets', _this.onSetAssets, _assertThisInitialized(_this));
	    _this.on('set_skeletonAsset', _this.onSetAsset, _assertThisInitialized(_this));
	    _this.on('set_atlasData', _this.onSetResource, _assertThisInitialized(_this));
	    _this.on('set_textures', _this.onSetResource, _assertThisInitialized(_this));
	    _this.on('set_skeletonData', _this.onSetResource, _assertThisInitialized(_this));
	    return _this;
	  }