constructor(system, entity) {
        super(system, entity);

        /** @private */
        this._compoundParent = null;
        this._hasOffset = false;

        this.entity.on('insert', this._onInsert, this);

        this.on('set_type', this.onSetType, this);
        this.on('set_halfExtents', this.onSetHalfExtents, this);
        this.on('set_linearOffset', this.onSetOffset, this);
        this.on('set_angularOffset', this.onSetOffset, this);
        this.on('set_radius', this.onSetRadius, this);
        this.on('set_height', this.onSetHeight, this);
        this.on('set_axis', this.onSetAxis, this);
        this.on('set_asset', this.onSetAsset, this);
        this.on('set_renderAsset', this.onSetRenderAsset, this);
        this.on('set_model', this.onSetModel, this);
        this.on('set_render', this.onSetRender, this);
    }