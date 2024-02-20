function GlowSV(args) {
			this.u_blurX = false;
			this.u_color = null;
			this.u_offset = null;
			this.u_strength = NaN;
			this.u_texW = 0;
			this.u_texH = 0;
			GlowSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.FILTERGLOW*/0x08 | /*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01);
		}