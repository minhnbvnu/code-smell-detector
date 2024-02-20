function RenderTarget2D(width, height, surfaceFormat, surfaceType, depthStencilFormat, mipMap, repeat, minFifter, magFifter) {
			this._type = 0;
			this._svWidth = NaN;
			this._svHeight = NaN;
			this._preRenderTarget = null;
			//TODO:.........................................................
			this._alreadyResolved = false;
			this._looked = false;
			this._surfaceFormat = 0;
			this._surfaceType = 0;
			this._depthStencilFormat = 0;
			this._mipMap = false;
			this._repeat = false;
			this._minFifter = 0;
			this._magFifter = 0;
			this._destroy = false;
			(surfaceFormat === void 0) && (surfaceFormat =/*laya.webgl.WebGLContext.RGBA*/0x1908);
			(surfaceType === void 0) && (surfaceType =/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401);
			(depthStencilFormat === void 0) && (depthStencilFormat =/*laya.webgl.WebGLContext.DEPTH_STENCIL*/0x84F9);
			(mipMap === void 0) && (mipMap = false);
			(repeat === void 0) && (repeat = false);
			(minFifter === void 0) && (minFifter = -1);
			(magFifter === void 0) && (magFifter = -1);
			this._type = 1;
			this._w = width;
			this._h = height;
			this._surfaceFormat = surfaceFormat;
			this._surfaceType = surfaceType;
			this._depthStencilFormat = depthStencilFormat;
			this._mipMap = mipMap;
			this._repeat = repeat;
			this._minFifter = minFifter;
			this._magFifter = magFifter;
			this._createWebGLRenderTarget();
			this.bitmap.lock = true;
			RenderTarget2D.__super.call(this, this.bitmap, Texture.INV_UV);
		}