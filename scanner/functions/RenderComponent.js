constructor(system, entity) {
        super(system, entity);

        // the entity that represents the root bone if this render component has skinned meshes
        this._rootBone = new EntityReference(this, 'rootBone');
        this._rootBone.on('set:entity', this._onSetRootBone, this);

        // render asset reference
        this._assetReference = new AssetReference(
            'asset',
            this,
            system.app.assets, {
                add: this._onRenderAssetAdded,
                load: this._onRenderAssetLoad,
                remove: this._onRenderAssetRemove,
                unload: this._onRenderAssetUnload
            },
            this
        );

        this._material = system.defaultMaterial;

        // handle events when the entity is directly (or indirectly as a child of sub-hierarchy)
        // added or removed from the parent
        entity.on('remove', this.onRemoveChild, this);
        entity.on('removehierarchy', this.onRemoveChild, this);
        entity.on('insert', this.onInsertChild, this);
        entity.on('inserthierarchy', this.onInsertChild, this);
    }