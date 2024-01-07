constructor(device, options) {
        super();

        this._device = device;
        this._pixelsPerUnit = options && options.pixelsPerUnit !== undefined ? options.pixelsPerUnit : 1;
        this._renderMode = options && options.renderMode !== undefined ? options.renderMode : SPRITE_RENDERMODE_SIMPLE;
        this._atlas = options && options.atlas !== undefined ? options.atlas : null;
        this._frameKeys = options && options.frameKeys !== undefined ? options.frameKeys : null;
        this._meshes = [];

        // set to true to update multiple
        // properties without re-creating meshes
        this._updatingProperties = false;
        // if true, endUpdate() will re-create meshes when it's called
        this._meshesDirty = false;

        if (this._atlas && this._frameKeys) {
            this._createMeshes();
        }
    }