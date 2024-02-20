function SubmitCanvas() {
			//this._ctx_src=null;
			this._matrix = new Matrix();
			this._matrix4 = CONST3D2D.defaultMatrix4.concat();
			SubmitCanvas.__super.call(this,/*laya.webgl.submit.Submit.TYPE_2D*/10000);
			this.shaderValue = new Value2D(0, 0);
		}