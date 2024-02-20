function Atlaser(gridNumX, gridNumY, width, height, atlasID) {
			this._atlasCanvas = null;
			this._inAtlasTextureKey = null;
			this._inAtlasTextureBitmapValue = null;
			this._inAtlasTextureOriUVValue = null;
			this._InAtlasWebGLImagesKey = null;
			this._InAtlasWebGLImagesOffsetValue = null;
			Atlaser.__super.call(this, gridNumX, gridNumY, atlasID);
			this._inAtlasTextureKey = [];
			this._inAtlasTextureBitmapValue = [];
			this._inAtlasTextureOriUVValue = [];
			this._InAtlasWebGLImagesKey = {};
			this._InAtlasWebGLImagesOffsetValue = [];
			this._atlasCanvas = new AtlasWebGLCanvas();
			this._atlasCanvas._atlaser = this;
			this._atlasCanvas.width = width;
			this._atlasCanvas.height = height;
			this._atlasCanvas.activeResource();
			this._atlasCanvas.lock = true;
		}