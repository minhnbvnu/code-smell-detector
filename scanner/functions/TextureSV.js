function TextureSV(subID) {
			this.u_colorMatrix = null;
			this.strength = 0;
			this.blurInfo = null;
			this.colorMat = null;
			this.colorAlpha = null;
			this.texcoord = Value2D._TEXCOORD;
			(subID === void 0) && (subID = 0);
			TextureSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, subID);
		}