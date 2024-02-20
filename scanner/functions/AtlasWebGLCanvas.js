function AtlasWebGLCanvas() {
			this._atlaser = null;
			/**兼容Stage3D使用*/
			this._flashCacheImage = null;
			this._flashCacheImageNeedFlush = false;
			AtlasWebGLCanvas.__super.call(this);
		}