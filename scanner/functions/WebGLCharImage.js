function WebGLCharImage(content, drawValue) {
			this.CborderSize = 12;
			//this._ctx=null;
			/***是否创建私有Source*/
			//this._allowMerageInAtlas=false;
			/**是否允许加入大图合集*/
			//this._enableMerageInAtlas=false;
			/**HTML Canvas，绘制字符载体,非私有数据载体*/
			//this.canvas=null;
			/**********************************************************************************/
			//this.cw=NaN;
			//this.ch=NaN;
			//this.xs=NaN;
			//this.ys=NaN;
			//this.char=null;
			//this.fillColor=null;
			//this.borderColor=null;
			//this.borderSize=0;
			//this.font=null;
			//this.fontSize=0;
			//this.texture=null;
			//this.lineWidth=0;
			//this.UV=null;
			//this.isSpace=false;
			//this.underLine=0;
			WebGLCharImage.__super.call(this);
			this.char = content;
			this.isSpace = content === ' ';
			this.xs = drawValue.scaleX;
			this.ys = drawValue.scaleY;
			this.font = drawValue.font.toString();
			this.fontSize = drawValue.font.size;
			this.fillColor = drawValue.fillColor;
			this.borderColor = drawValue.borderColor;
			this.lineWidth = drawValue.lineWidth;
			this.underLine = drawValue.underLine;
			var bIsConchApp = Render.isConchApp;
			var pCanvas;
			if (bIsConchApp) {
			/*__JS__ */pCanvas = ConchTextCanvas;
			/*__JS__ */pCanvas._source = ConchTextCanvas;
			/*__JS__ */pCanvas._source.canvas = ConchTextCanvas;
			} else {
				pCanvas = Browser.canvas.source;
			}
			this.canvas = pCanvas;
			this._enableMerageInAtlas = true;
			if (bIsConchApp) {
			/*__JS__ */this._ctx = pCanvas;
			} else {
				this._ctx = this.canvas.getContext('2d', undefined);
			};
			var t = Utils.measureText(this.char, this.font);
			this.cw = t.width * this.xs;
			this.ch = (t.height || this.fontSize) * this.ys;
			this.onresize(this.cw + this.CborderSize * 2, this.ch + this.CborderSize * 2);
			this.texture = new Texture(this);
		}