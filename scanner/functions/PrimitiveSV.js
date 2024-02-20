function PrimitiveSV(args) {
			this.a_color = null;
			this.u_pos = [0, 0];
			PrimitiveSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0);
			this.position = [2,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, 5 * CONST3D2D.BYTES_PE, 0];
			this.a_color = [3,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, 5 * CONST3D2D.BYTES_PE, 2 * CONST3D2D.BYTES_PE];
		}