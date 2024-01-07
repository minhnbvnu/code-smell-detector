function SpineTextureWrapper(texture) {
	    _classCallCheck(this, SpineTextureWrapper);
	    this._image = {
	      width: texture.width,
	      height: texture.height
	    };
	    this.pcTexture = texture;
	  }