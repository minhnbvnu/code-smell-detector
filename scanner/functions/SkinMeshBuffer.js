function SkinMeshBuffer() {
			this.ib = null;
			this.vb = null;
			var gl = WebGL.mainContext;
			this.ib = IndexBuffer2D.create(/*laya.webgl.WebGLContext.DYNAMIC_DRAW*/0x88E8);
			this.vb = VertexBuffer2D.create(8);
		}