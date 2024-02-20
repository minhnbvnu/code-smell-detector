function WebGLImage(data, def, format, mipmap) {
			/**@private */
			this._format = 0;
			/**@private */
			this._mipmap = false;
			/***是否创建私有Source,值为false时不根据src创建私有WebGLTexture,同时销毁时也只清空source=null,不调用WebGL.mainContext.deleteTexture类似函数，调用资源激活前有效*/
			this._allowMerageInAtlas = false;
			/**是否允许加入大图合集*/
			this._enableMerageInAtlas = false;
			/**是否使用重复模式纹理寻址*/
			this.repeat = false;
			/**@private */
			this._image = null;
			/**缩小过滤器*/
			this.minFifter = 0;
			/**放大过滤器*/
			this.magFifter = 0;
			(format === void 0) && (format =/*laya.webgl.WebGLContext.RGBA*/0x1908);
			(mipmap === void 0) && (mipmap = true);
			WebGLImage.__super.call(this, data, def);
			this._format = format;
			this._mipmap = mipmap;
			this.repeat = false;
			this.minFifter = -1;
			this.magFifter = -1;
			if ((typeof data == 'string')) {
				this.url = data;
				this._src = data;
				this._image = new Browser.window.Image();
				if (def) {
					def.onload && (this.onload = def.onload);
					def.onerror && (this.onerror = def.onerror);
					def.onCreate && def.onCreate(this);
				}
				this._image.crossOrigin = (data && (data.indexOf("data:") == 0)) ? null : "";
				(data) && (this._image.src = data);
			} else if ((data instanceof ArrayBuffer)) {
				this._src = def;
				this.url = this._src;
				var readData = new Byte(data);
				var magicNumber = readData.readUTFBytes(4);
				var version = readData.readUTFBytes(2);
				var dataType = readData.getInt16();
				readData.endian =/*laya.utils.Byte.BIG_ENDIAN*/"bigEndian";
				this._w = readData.getInt16();
				this._h = readData.getInt16();
				var originalWidth = readData.getInt16();
				var originalHeight = readData.getInt16();
				this._image = new Uint8Array(data, readData.pos);
				this._format = WebGL.compressEtc1.COMPRESSED_RGB_ETC1_WEBGL;
				(AtlasResourceManager.enabled) && (this._w < AtlasResourceManager.atlasLimitWidth && this._h < AtlasResourceManager.atlasLimitHeight) ? this._allowMerageInAtlas = true : this._allowMerageInAtlas = false;
			} else {
				this._src = def;
				this.url = this._src;
				this._image = data["source"] || data;
				this.onresize();
			}
			this._$5__enableMerageInAtlas = true;
		}