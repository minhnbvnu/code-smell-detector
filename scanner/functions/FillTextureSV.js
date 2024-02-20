function FillTextureSV(type) {
			this.u_colorMatrix = null;
			this.strength = 0;
			this.colorMat = null;
			this.colorAlpha = null;
			this.u_TexRange = [0, 1, 0, 1];
			this.u_offset = [0, 0];
			this.texcoord = Value2D._TEXCOORD;
			FillTextureSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.FILLTEXTURE*/0x100, 0);
		}