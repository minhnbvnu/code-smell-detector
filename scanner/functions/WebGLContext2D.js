function WebGLContext2D(c) {
			this._x = 0;
			this._y = 0;
			this._id = ++WebGLContext2D._COUNT;
			//this._other=null;
			this._path = null;
			//this._primitiveValue2D=null;
			this._drawCount = 1;
			this._maxNumEle = 0;
			this._clear = false;
			this._isMain = false;
			this._atlasResourceChange = 0;
			this._submits = null;
			this._curSubmit = null;
			this._ib = null;
			this._vb = null;
			//this._curMat=null;
			this._nBlendType = 0;
			//this._save=null;
			//this._targets=null;
			//this._renderKey=NaN;
			this._saveMark = null;
			this._shader2D = null;
			/**所cacheAs精灵*/
			//this.sprite=null;
			/*******************************************start矢量绘制***************************************************/
			this.mId = -1;
			this.mHaveKey = false;
			this.mHaveLineKey = false;
			this.mX = 0;
			this.mY = 0;
			WebGLContext2D.__super.call(this);
			this._width = 99999999;
			this._height = 99999999;
			this._clipRect = WebGLContext2D.MAXCLIPRECT;
			this.mOutPoint
			this._canvas = c;
			WebGLContext2D._contextcount++;
			if (Render.isFlash) {
				this._ib = IndexBuffer2D.create(/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
				GlUtils.fillIBQuadrangle(this._ib, 16);
			} else
				this._ib = IndexBuffer2D.QuadrangleIB;
			this.clear();
		}