function WebGLSubImage(canvas, offsetX, offsetY, width, height, atlasImage, src) {
			/**HTML Context*/
			//this._ctx=null;
			/***是否创建私有Source,值为false时不根据src创建私有WebGLTexture,同时销毁时也只清空source=null,不调用WebGL.mainContext.deleteTexture类似函数，调用资源激活前有效*/
			//this._allowMerageInAtlas=false;
			/**是否允许加入大图合集*/
			//this._enableMerageInAtlas=false;
			/**HTML Canvas，绘制子图载体,非私有数据载体*/
			//this.canvas=null;
			/**是否使用重复模式纹理寻址*/
			//this.repeat=false;
			/**是否使用mipLevel*/
			//this.mipmap=false;
			/**缩小过滤器*/
			//this.minFifter=0;
			/**放大过滤器*/
			//this.magFifter=0;
			//动态默认值，判断是否可生成miplevel
			//this.atlasImage=null;
			this.offsetX = 0;
			this.offsetY = 0;
			//this.src=null;
			WebGLSubImage.__super.call(this);
			this.repeat = true;
			this.mipmap = false;
			this.minFifter = -1;
			this.magFifter = -1;
			this.atlasImage = atlasImage;
			this.canvas = canvas;
			this._ctx = canvas.getContext('2d', undefined);
			this._w = width;
			this._h = height;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.src = src;
			this._enableMerageInAtlas = true;
			(AtlasResourceManager.enabled) && (this._w < AtlasResourceManager.atlasLimitWidth && this._h < AtlasResourceManager.atlasLimitHeight) ? this._allowMerageInAtlas = true : this._allowMerageInAtlas = false;
		}