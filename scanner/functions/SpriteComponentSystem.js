constructor(app) {
        super(app);

        this.id = 'sprite';

        this.ComponentType = SpriteComponent;
        this.DataType = SpriteComponentData;

        this.schema = _schema;

        // default texture - make white so we can tint it with emissive color
        this._defaultTexture = null;

        // default material used by sprites
        this._defaultMaterial = null;

        // material used for 9-slicing in sliced mode
        this._default9SlicedMaterialSlicedMode = null;

        // material used for 9-slicing in tiled mode
        this._default9SlicedMaterialTiledMode = null;

        this.app.systems.on('update', this.onUpdate, this);
        this.on('beforeremove', this.onBeforeRemove, this);
    }