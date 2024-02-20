function SkinMesh() {
			this.mVBBuffer = null;
			this.mIBBuffer = null;
			this.mVBData = null;
			this.mIBData = null;
			this.mEleNum = 0;
			this.mTexture = null;
			this.transform = null;
			this._vs = null;
			this._ps = null;
			this._indexStart = -1;
			this._verticles = null;
			this._uvs = null;
			this._tempMatrix = new Matrix();
		}