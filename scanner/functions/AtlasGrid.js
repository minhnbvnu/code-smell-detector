function AtlasGrid(width, height, atlasID) {
			this._atlasID = 0;
			this._width = 0;
			this._height = 0;
			this._texCount = 0;
			this._rowInfo = null;
			this._cells = null;
			this._failSize = new TexMergeTexSize();
			(width === void 0) && (width = 0);
			(height === void 0) && (height = 0);
			(atlasID === void 0) && (atlasID = 0);
			this._cells = null;
			this._rowInfo = null;
			this._init(width, height);
			this._atlasID = atlasID;
		}