function VertexBuffer2D(vertexStride, bufferUsage) {
			this._floatArray32 = null;
			this._vertexStride = 0;
			VertexBuffer2D.__super.call(this);
			this._vertexStride = vertexStride;
			this._bufferUsage = bufferUsage;
			this._bufferType =/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892;
			Render.isFlash || (this._buffer = new ArrayBuffer(8));
			this.getFloat32Array();
		}