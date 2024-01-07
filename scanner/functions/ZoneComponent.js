constructor(system, entity) {
        super(system, entity);

        this._oldState = true;
        this._size = new Vec3();
        this.on('set_enabled', this._onSetEnabled, this);
    }