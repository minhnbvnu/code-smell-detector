function SubmitTexture(renderType) {
			this._preIsSameTextureShader = false;
			this._isSameTexture = true;
			this._texs = new Array;
			this._texsID = new Array;
			this._vbPos = new Array;
			(renderType === void 0) && (renderType = 10000);
			SubmitTexture.__super.call(this, renderType);
		}