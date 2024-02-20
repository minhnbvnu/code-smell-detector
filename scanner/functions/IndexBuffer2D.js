function IndexBuffer2D(bufferUsage) {
			this._uint8Array = null;
			this._uint16Array = null;
			(bufferUsage === void 0) && (bufferUsage =/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
			IndexBuffer2D.__super.call(this);
			this._bufferUsage = bufferUsage;
			this._bufferType =/*laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER*/0x8893;
			Render.isFlash || (this._buffer = new ArrayBuffer(8));
		}