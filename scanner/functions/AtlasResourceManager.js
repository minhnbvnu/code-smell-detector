function AtlasResourceManager(width, height, gridSize, maxTexNum) {
			this._currentAtlasCount = 0;
			this._maxAtlaserCount = 0;
			this._width = 0;
			this._height = 0;
			this._gridSize = 0;
			this._gridNumX = 0;
			this._gridNumY = 0;
			this._init = false;
			this._curAtlasIndex = 0;
			this._setAtlasParam = false;
			this._atlaserArray = null;
			this._needGC = false;
			this._setAtlasParam = true;
			this._width = width;
			this._height = height;
			this._gridSize = gridSize;
			this._maxAtlaserCount = maxTexNum;
			this._gridNumX = width / gridSize;
			this._gridNumY = height / gridSize;
			this._curAtlasIndex = 0;
			this._atlaserArray = [];
		}