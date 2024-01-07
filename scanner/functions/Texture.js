constructor(graphicsDevice, options = {}) {
        this.device = graphicsDevice;
        Debug.assert(this.device, "Texture constructor requires a graphicsDevice to be valid");
        Debug.assert(!options.width || Number.isInteger(options.width), "Texture width must be an integer number, got", options);
        Debug.assert(!options.height || Number.isInteger(options.height), "Texture height must be an integer number, got", options);
        Debug.assert(!options.depth || Number.isInteger(options.depth), "Texture depth must be an integer number, got", options);

        this.name = options.name ?? '';

        this._width = Math.floor(options.width ?? 4);
        this._height = Math.floor(options.height ?? 4);

        this._format = options.format ?? PIXELFORMAT_RGBA8;
        this._compressed = isCompressedPixelFormat(this._format);

        if (graphicsDevice.supportsVolumeTextures) {
            this._volume = options.volume ?? false;
            this._depth = Math.floor(options.depth ?? 1);
            this._arrayLength = Math.floor(options.arrayLength ?? 0);
        } else {
            this._volume = false;
            this._depth = 1;
            this._arrayLength = 0;
        }

        this._storage = options.storage ?? false;
        this._cubemap = options.cubemap ?? false;
        this.fixCubemapSeams = options.fixCubemapSeams ?? false;
        this._flipY = options.flipY ?? false;
        this._premultiplyAlpha = options.premultiplyAlpha ?? false;

        this._mipmaps = options.mipmaps ?? options.autoMipmap ?? true;
        this._minFilter = options.minFilter ?? FILTER_LINEAR_MIPMAP_LINEAR;
        this._magFilter = options.magFilter ?? FILTER_LINEAR;
        this._anisotropy = options.anisotropy ?? 1;
        this._addressU = options.addressU ?? ADDRESS_REPEAT;
        this._addressV = options.addressV ?? ADDRESS_REPEAT;
        this._addressW = options.addressW ?? ADDRESS_REPEAT;

        this._compareOnRead = options.compareOnRead ?? false;
        this._compareFunc = options.compareFunc ?? FUNC_LESS;

        this.type = TEXTURETYPE_DEFAULT;
        if (options.hasOwnProperty('type')) {
            this.type = options.type;
        } else if (options.hasOwnProperty('rgbm')) {
            Debug.deprecated("options.rgbm is deprecated. Use options.type instead.");
            this.type = options.rgbm ? TEXTURETYPE_RGBM : TEXTURETYPE_DEFAULT;
        } else if (options.hasOwnProperty('swizzleGGGR')) {
            Debug.deprecated("options.swizzleGGGR is deprecated. Use options.type instead.");
            this.type = options.swizzleGGGR ? TEXTURETYPE_SWIZZLEGGGR : TEXTURETYPE_DEFAULT;
        }

        this.projection = TEXTUREPROJECTION_NONE;
        if (this._cubemap) {
            this.projection = TEXTUREPROJECTION_CUBE;
        } else if (options.projection && options.projection !== TEXTUREPROJECTION_CUBE) {
            this.projection = options.projection;
        }

        this.impl = graphicsDevice.createTextureImpl(this);

        // #if _PROFILER
        this.profilerHint = options.profilerHint ?? 0;
        // #endif

        this.dirtyAll();

        this._levels = options.levels;
        if (this._levels) {
            this.upload();
        } else {
            this._levels = this._cubemap ? [[null, null, null, null, null, null]] : [null];
        }

        // track the texture
        graphicsDevice.textures.push(this);

        Debug.trace(TRACEID_TEXTURE_ALLOC, `Alloc: Id ${this.id} ${this.name}: ${this.width}x${this.height} ` +
            `${this.cubemap ? '[Cubemap]' : ''}` +
            `${this.volume ? '[Volume]' : ''}` +
            `${this.array ? '[Array]' : ''}` +
            `${this.mipmaps ? '[Mipmaps]' : ''}`, this);
    }