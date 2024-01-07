constructor(system, entity) {
        super(system, entity);

        this._material = system.defaultMaterial;

        // handle events when the entity is directly (or indirectly as a child of sub-hierarchy) added or removed from the parent
        entity.on('remove', this.onRemoveChild, this);
        entity.on('removehierarchy', this.onRemoveChild, this);
        entity.on('insert', this.onInsertChild, this);
        entity.on('inserthierarchy', this.onInsertChild, this);
    }