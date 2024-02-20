function Value2D(mainID, subID) {
			this.size = [0, 0];
			this.alpha = 1.0;
			//this.mmat=null;
			this.ALPHA = 1.0;
			//this.shader=null;
			//this.mainID=0;
			this.subID = 0;
			//this.filters=null;
			//this.textureHost=null;
			//this.texture=null;
			//this.fillStyle=null;
			//this.color=null;
			//this.strokeStyle=null;
			//this.colorAdd=null;
			//this.glTexture=null;
			//this.u_mmat2=null;
			//this._inClassCache=null;
			this._cacheID = 0;
			Value2D.__super.call(this);
			this.defines = new ShaderDefines2D();
			this.position = Value2D._POSITION;
			this.mainID = mainID;
			this.subID = subID;
			this.textureHost = null;
			this.texture = null;
			this.fillStyle = null;
			this.color = null;
			this.strokeStyle = null;
			this.colorAdd = null;
			this.glTexture = null;
			this.u_mmat2 = null;
			this._cacheID = mainID | subID;
			this._inClassCache = Value2D._cache[this._cacheID];
			if (mainID > 0 && !this._inClassCache) {
				this._inClassCache = Value2D._cache[this._cacheID] = [];
				this._inClassCache._length = 0;
			}
			this.clear();
		}