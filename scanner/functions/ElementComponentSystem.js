constructor(app) {
        super(app);

        this.id = 'element';

        this.ComponentType = ElementComponent;
        this.DataType = ElementComponentData;

        this.schema = _schema;
        this._unicodeConverter = null;
        this._rtlReorder = null;

        // default texture - make white so we can tint it with emissive color
        this._defaultTexture = new Texture(app.graphicsDevice, {
            width: 1,
            height: 1,
            format: PIXELFORMAT_RGBA8,
            name: 'element-system'
        });
        const pixels = this._defaultTexture.lock();
        const pixelData = new Uint8Array(4);
        pixelData[0] = 255.0;
        pixelData[1] = 255.0;
        pixelData[2] = 255.0;
        pixelData[3] = 255.0;
        pixels.set(pixelData);
        this._defaultTexture.unlock();

        // image element materials created on demand by getImageElementMaterial()
        this.defaultImageMaterial = null;
        this.defaultImage9SlicedMaterial = null;
        this.defaultImage9TiledMaterial = null;
        this.defaultImageMaskMaterial = null;
        this.defaultImage9SlicedMaskMaterial = null;
        this.defaultImage9TiledMaskMaterial = null;
        this.defaultScreenSpaceImageMaterial = null;
        this.defaultScreenSpaceImage9SlicedMaterial = null;
        this.defaultScreenSpaceImage9TiledMaterial = null;
        this.defaultScreenSpaceImageMask9SlicedMaterial = null;
        this.defaultScreenSpaceImageMask9TiledMaterial = null;
        this.defaultScreenSpaceImageMaskMaterial = null;

        // text element materials created on demand by getTextElementMaterial()
        this._defaultTextMaterials = {};

        this.defaultImageMaterials = [];

        this.on('beforeremove', this.onRemoveComponent, this);
    }