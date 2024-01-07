function SpineComponentSystem(app) {
	    var _this;
	    _classCallCheck(this, SpineComponentSystem);
	    _this = _super.call(this, app);
	    _this.id = 'spine';
	    _this.ComponentType = SpineComponent;
	    _this.DataType = SpineComponentData;
	    _this.schema = ['enabled', 'atlasAsset', 'textureAssets', 'skeletonAsset', 'atlasData', 'textures', 'skeletonData', 'speed', 'spine'];
	    _this.on('beforeremove', _this.onBeforeRemove, _assertThisInitialized(_this));
	    _this.app.systems.on('update', _this.onUpdate, _assertThisInitialized(_this));
	    return _this;
	  }